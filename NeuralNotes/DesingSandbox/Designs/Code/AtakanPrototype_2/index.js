const canvas = document.getElementById("canvas");
// const addBtn = document.getElementById("addNodeBtn"); // Eski buton referansı kaldırıldı
const svgLines = document.getElementById("lines");

// Action Bar Butonları
const deleteBtn = document.getElementById('deleteNodeBtn');
const addNodeBtn = document.getElementById('addNodeFromBarBtn'); // Yeni ekleme butonu referansı
const colorBtn = document.getElementById('colorNodeBtn');
// const shapeBtn = document.getElementById('shapeNodeBtn'); // Silindi
const colorPicker = document.getElementById('colorPicker'); // Renk paleti referansı
const lineDeleteBtn = document.getElementById('lineDeleteBtn'); // Silme butonu referansı
const connectBtn = document.getElementById('connectBtn');

// === ARKA PLAN PANELİ ===
const backgroundBtn = document.getElementById('backgroundBtn');
const backgroundPanel = document.getElementById('backgroundPanel');
const closeBgPanelBtn = document.getElementById('closeBgPanelBtn');
const patternBtns = document.querySelectorAll('.bg-pattern-btn');
const gradientBtns = document.querySelectorAll('.bg-gradient-btn');
const themeBtns = document.querySelectorAll('.bg-theme-btn');
const gridSizeSlider = document.getElementById('gridSizeSlider');
const gridSizeValue = document.getElementById('gridSizeValue');
const bgImageInput = document.getElementById('bgImageInput');
const removeBgImageBtn = document.getElementById('removeBgImageBtn');
const canvasEl = document.getElementById('canvas');

let nodes = [];
let nodeIdCounter = 0;
let selectedNodeId = null; // Keep track of the selected node
let lineToDelete = null; // Silinecek çizgi referansını tut
let hideDeleteBtnTimer = null; // Butonu gizleme zamanlayıcısı
let isDraggingGlobal = false; // Sürükleme durumunu global yapalım
let connectMode = false;
let tempLine = null;
let dragFromNodeId = null;

// Node merkezini hesaplayan yardımcı fonksiyon
function getNodeCenter(nodeElement) {
    const rect = nodeElement.getBoundingClientRect();
    return {
        x: nodeElement.offsetLeft + rect.width / 2,
        y: nodeElement.offsetTop + rect.height / 2
    };
}

// Yeni: Node alt kenarının ortasını hesaplayan fonksiyon
function getNodeBottomCenter(nodeElement) {
    const rect = nodeElement.getBoundingClientRect();
    return {
        x: nodeElement.offsetLeft + rect.width / 2,
        y: nodeElement.offsetTop + rect.height
    };
}

// Kenar merkezlerini hesaplayan fonksiyon
function getNodeEdgeCenters(nodeElement) {
    const rect = nodeElement.getBoundingClientRect();
    return {
        top: {
            x: nodeElement.offsetLeft + rect.width / 2,
            y: nodeElement.offsetTop
        },
        bottom: {
            x: nodeElement.offsetLeft + rect.width / 2,
            y: nodeElement.offsetTop + rect.height
        },
        left: {
            x: nodeElement.offsetLeft,
            y: nodeElement.offsetTop + rect.height / 2
        },
        right: {
            x: nodeElement.offsetLeft + rect.width,
            y: nodeElement.offsetTop + rect.height / 2
        }
    };
}

// İki node arasında en iyi bağlantı noktalarını seçen fonksiyon
function getBestConnectionPoints(nodeA, nodeB) {
    const a = getNodeEdgeCenters(nodeA.element);
    const b = getNodeEdgeCenters(nodeB.element);

    const ax = nodeA.element.offsetLeft + nodeA.element.offsetWidth / 2;
    const ay = nodeA.element.offsetTop + nodeA.element.offsetHeight / 2;
    const bx = nodeB.element.offsetLeft + nodeB.element.offsetWidth / 2;
    const by = nodeB.element.offsetTop + nodeB.element.offsetHeight / 2;

    const dx = bx - ax;
    const dy = by - ay;

    if (Math.abs(dx) > Math.abs(dy)) {
        // Yatay bağlantı
        if (dx > 0) {
            // A'nın sağından B'nin soluna
            return [a.right, b.left];
        } else {
            // A'nın solundan B'nin sağına
            return [a.left, b.right];
        }
    } else {
        // Dikey bağlantı
        if (dy > 0) {
            // A'nın altından B'nin üstüne
            return [a.bottom, b.top];
        } else {
            // A'nın üstünden B'nin altına
            return [a.top, b.bottom];
        }
    }
}

// Helper: Bezier path string between two points
function getCurvedPath(x1, y1, x2, y2) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    // Yatayda daha çok, dikeyde daha az kavis
    const curve = Math.max(dx, dy) * 0.4;
    const c1x = x1 + (x2 > x1 ? curve : -curve);
    const c1y = y1;
    const c2x = x2 - (x2 > x1 ? curve : -curve);
    const c2y = y2;
    return `M${x1},${y1} C${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`;
}

// İki node arasına kavisli ok çizen fonksiyon
function connectNodes(nodeA, nodeB) {
    if (connectionExists(nodeA, nodeB)) {
        console.warn(`Attempted to create duplicate connection between ${nodeA.id} and ${nodeB.id}.`);
        return null;
    }
    // En iyi kenar noktalarını bul
    const [pointA, pointB] = getBestConnectionPoints(nodeA, nodeB);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", getCurvedPath(pointA.x, pointA.y, pointB.x, pointB.y));
    path.setAttribute("stroke", "#b48a3e");
    path.setAttribute("stroke-width", "2.5");
    path.setAttribute("fill", "none");
    path.setAttribute("marker-end", "url(#arrowhead)");
    path.dataset.nodeAId = nodeA.id;
    path.dataset.nodeBId = nodeB.id;
    svgLines.appendChild(path);
    if (!nodeA.connections.some(c => c.connectedNodeId === nodeB.id)) {
        nodeA.connections.push({ connectedNodeId: nodeB.id, lineElement: path });
    }
    if (!nodeB.connections.some(c => c.connectedNodeId === nodeA.id)) {
        nodeB.connections.push({ connectedNodeId: nodeA.id, lineElement: path });
    }
    return path;
}

// Çizgileri güncelleyen fonksiyon (path için)
function updateLines(node) {
    const paths = svgLines.querySelectorAll(`path[data-node-a-id="${node.id}"], path[data-node-b-id="${node.id}"]`);
    paths.forEach(path => {
        const nodeAId = parseInt(path.dataset.nodeAId, 10);
        const nodeBId = parseInt(path.dataset.nodeBId, 10);
        const nodeA = nodes.find(n => n.id === nodeAId);
        const nodeB = nodes.find(n => n.id === nodeBId);
        if (nodeA && nodeB) {
            const [pointA, pointB] = getBestConnectionPoints(nodeA, nodeB);
            path.setAttribute("d", getCurvedPath(pointA.x, pointA.y, pointB.x, pointB.y));
        }
    });
}

// Function to deselect all nodes
function deselectAllNodes() {
    nodes.forEach(n => n.element.classList.remove('selected'));
    selectedNodeId = null;
}

// Function to select a node
function selectNode(node) {
    deselectAllNodes(); // Deselect others first
    node.element.classList.add('selected');
    selectedNodeId = node.id;
}

// Helper to check if a connection already exists between two nodes
function connectionExists(nodeA, nodeB) {
    const existingPath = svgLines.querySelector(
        `path[data-node-a-id="${nodeA.id}"][data-node-b-id="${nodeB.id}"], \
         path[data-node-a-id="${nodeB.id}"][data-node-b-id="${nodeA.id}"]`
    );
    return !!existingPath;
}

function createNode(text, x, y) {
    const nodeElement = document.createElement("div");
    nodeElement.className = "node";
    nodeElement.textContent = text;
    nodeElement.style.left = `${x}px`;
    nodeElement.style.top = `${y}px`;
    nodeElement.setAttribute('contenteditable', 'true');

    // Animasyon sınıfını ekle (başlangıç durumu)
    nodeElement.classList.add('node-appear');

    // ÖNEMLİ: Node'u DOM'a ekle, *sonra* animasyonu tetikle
    canvas.appendChild(nodeElement);

    const node = {
        id: nodeIdCounter++,
        element: nodeElement,
        connections: []
    };
    nodes.push(node);

    // Add click listener for selection AND connection
    nodeElement.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent canvas click

        const isCtrlPressed = event.ctrlKey || event.metaKey; // Ctrl or Cmd

        if (isCtrlPressed && selectedNodeId !== null && selectedNodeId !== node.id) {
            // --- Connection Logic --- 
            const firstNode = nodes.find(n => n.id === selectedNodeId);
            if (firstNode && !connectionExists(firstNode, node)) {
                console.log(`Connecting node ${firstNode.id} and ${node.id}`);
                const line = connectNodes(firstNode, node);
                // Store connection info (redundant if connectNodes does it, but safe)
                firstNode.connections.push({ connectedNodeId: node.id, lineElement: line });
                node.connections.push({ connectedNodeId: firstNode.id, lineElement: line });
                // Keep the second node selected after connecting
                selectNode(node);
            } else if (firstNode && connectionExists(firstNode, node)) {
                console.log(`Connection already exists between ${firstNode.id} and ${node.id}`);
                // Optionally allow deleting connection here?
                selectNode(node); // Select the second node anyway
            } else {
                // If firstNode not found (shouldn't happen), just select the clicked node
                selectNode(node);
            }
        } else {
            // --- Standard Selection Logic --- 
            selectNode(node);
        }
    });

    makeDraggable(node);
    setupEdgeResizing(node);

    // Kısa bir gecikme ile animasyon sınıfını kaldır (transition'ı tetikler)
    setTimeout(() => {
        nodeElement.classList.remove('node-appear');
    }, 10); // Küçük bir gecikme (10ms)

    if (connectMode) addConnectPoint(node);
    return node;
}

// Sürükle-bırak fonksiyonu (çizgi güncelleme eklendi)
function makeDraggable(node) {
    const el = node.element;
    let offsetX = 0,
        offsetY = 0;

    el.addEventListener("mousedown", (e) => {
        // SADECE boyutlandırma başlamadıysa sürüklemeyi başlat
        if (!isResizingGlobal && resizeEdge === 'none') {
            console.log("Draggable: Mouse down, starting drag");
            isDraggingGlobal = true;
            offsetX = e.clientX - el.offsetLeft;
            offsetY = e.clientY - el.offsetTop;
            el.style.cursor = 'grabbing';
            // Sürükleme başladığında global move/up listenerları ekle
            document.addEventListener('mousemove', handleGlobalDragMove);
            document.addEventListener('mouseup', handleGlobalDragUp);
        } else {
            console.log("Draggable: Mouse down ignored (resizing or edge detected)");
        }
    });

    // Global move/up handler'ları dışarı taşıyalım
    function handleGlobalDragMove(e) {
        if (!isDraggingGlobal) return;
        // Sürüklenen nodun kendisi olduğundan emin ol (gerçi global state bunu sağlıyor)
        // if (node !== /* current dragging node */) return;
        console.log("Draggable: Drag move");
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
        updateLines(node);
    }

    function handleGlobalDragUp(e) {
        if (isDraggingGlobal) {
            console.log("Draggable: Drag up");
            isDraggingGlobal = false;
            el.style.cursor = 'grab';
            // Listenerları kaldır
            document.removeEventListener('mousemove', handleGlobalDragMove);
            document.removeEventListener('mouseup', handleGlobalDragUp);
        }
    }
}

// YENİ: Kenardan Boyutlandırma Fonksiyonları
let isResizingGlobal = false; // Global resize state
let resizingNode = null;
let resizeEdge = 'none'; // 'right', 'bottom', 'corner', 'none'
let startXGlobal, startYGlobal, startWidthGlobal, startHeightGlobal;
const resizeThreshold = 8; // Kenarlara ne kadar yakınlıkta imleç değişsin (piksel)

function setupEdgeResizing(node) {
    const element = node.element;

    element.addEventListener('mousemove', (e) => {
        if (isResizingGlobal || isDraggingGlobal) return; // Eğer boyutlandırma veya sürükleme varsa imleci değiştirme

        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        let onRightEdge = mouseX >= rect.right - resizeThreshold && mouseX <= rect.right;
        let onBottomEdge = mouseY >= rect.bottom - resizeThreshold && mouseY <= rect.bottom;

        if (onRightEdge && onBottomEdge) {
            element.style.cursor = 'nwse-resize';
            resizeEdge = 'corner';
        } else if (onRightEdge) {
            element.style.cursor = 'ew-resize';
            resizeEdge = 'right';
        } else if (onBottomEdge) {
            element.style.cursor = 'ns-resize';
            resizeEdge = 'bottom';
        } else {
            element.style.cursor = 'grab'; // Varsayılan sürükleme imleci
            resizeEdge = 'none';
        }
    });

    element.addEventListener('mouseleave', () => {
        if (!isResizingGlobal && !isDraggingGlobal) {
            element.style.cursor = 'grab';
            resizeEdge = 'none';
        }
    });

    element.addEventListener('mousedown', (e) => {
        if (resizeEdge !== 'none' && !isDraggingGlobal) {
            console.log("Resizing: Mouse down, starting resize from edge:", resizeEdge);
            e.stopPropagation();
            isResizingGlobal = true;
            resizingNode = node;
            startXGlobal = e.clientX;
            startYGlobal = e.clientY;
            startWidthGlobal = element.offsetWidth;
            startHeightGlobal = element.offsetHeight;
            document.body.style.cursor = element.style.cursor;
            document.addEventListener('mousemove', handleGlobalResizeMove);
            document.addEventListener('mouseup', handleGlobalResizeUp);
        } else {
            console.log("Resizing: Mouse down ignored (edge=", resizeEdge, "isDragging=", isDraggingGlobal, ")");
        }
    });
}

function handleGlobalResizeMove(e) {
    if (!isResizingGlobal || !resizingNode) return;
    console.log("Resizing: Resize move");
    const element = resizingNode.element;
    const dx = e.clientX - startXGlobal;
    const dy = e.clientY - startYGlobal;

    const minWidth = 60;
    const minHeight = 40;
    let newWidth = startWidthGlobal;
    let newHeight = startHeightGlobal;

    if (resizeEdge === 'right' || resizeEdge === 'corner') {
        newWidth = startWidthGlobal + dx;
    }
    if (resizeEdge === 'bottom' || resizeEdge === 'corner') {
        newHeight = startHeightGlobal + dy;
    }

    element.style.width = `${Math.max(newWidth, minWidth)}px`;
    element.style.height = `${Math.max(newHeight, minHeight)}px`;

    updateLines(resizingNode);
}

function handleGlobalResizeUp(e) { // Event parametresini ekle
    if (isResizingGlobal) {
        console.log("Resizing: Resize up");
        document.body.style.cursor = 'default';
        if (resizingNode) resizingNode.element.style.cursor = 'grab';
        isResizingGlobal = false;
        resizingNode = null;
        resizeEdge = 'none';
        document.removeEventListener('mousemove', handleGlobalResizeMove);
        document.removeEventListener('mouseup', handleGlobalResizeUp);
    }
    // Sürükleme için global up listener'ı da burada çağırabiliriz veya ayrı tutabiliriz.
    // handleGlobalDragUp(e); // Eğer tek bir global up handler istersen
}
// --- Kenardan Boyutlandırma Fonksiyonları Sonu ---

// --- Başlangıç --- //

// İlk merkez node
const centerNodeData = createNode("Merkez", window.innerWidth / 2 - 50, window.innerHeight / 2 - 25);

// Deselect when clicking on the canvas background
canvas.addEventListener('click', () => {
    deselectAllNodes();
});

// Add New Node Button (from Action Bar)
addNodeBtn.addEventListener("click", () => {
    let parentNode = nodes.find(n => n.id === selectedNodeId);
    if (!parentNode) {
        // If no node is selected, try to find any existing node as parent, or error out
        parentNode = centerNodeData && nodes.some(n => n.id === centerNodeData.id) ? centerNodeData : nodes[0];
        if (!parentNode) { // Handle case where no nodes exist at all
            console.error("Cannot add node: No parent node available. Create a 'Merkez' node first if none exist.");
            // Optionally, create a very first node if none exist
            // parentNode = createNode("Merkez", window.innerWidth / 2 - 50, window.innerHeight / 2 - 25);
            return;
        }
        // Select the default parent if a new one was chosen automatically
        selectNode(parentNode);
    }

    // Position the new node relative to the parent
    const parentCenter = getNodeCenter(parentNode.element);
    // Add some offset for better visibility
    const offsetX = Math.random() * 100 - 50 + 150; // Offset slightly right
    const offsetY = Math.random() * 100 - 50;

    const x = parentNode.element.offsetLeft + offsetX;
    const y = parentNode.element.offsetTop + offsetY;

    const newNodeData = createNode("", x, y); // Create new node with empty text

    // Connect the new node to the selected or center node
    const line = connectNodes(parentNode, newNodeData);

    // Store connection info (optional but good for management)
    parentNode.connections.push({ connectedNodeId: newNodeData.id, lineElement: line });
    newNodeData.connections.push({ connectedNodeId: parentNode.id, lineElement: line });

    // Automatically select the newly created node for immediate editing/action
    selectNode(newNodeData);
    newNodeData.element.focus(); // Focus for editing
});

// Delete Node Button (from Action Bar)
deleteBtn.addEventListener('click', () => {
    if (selectedNodeId !== null) {
        deleteNode(selectedNodeId);
    }
});

// Placeholder Listeners for future features
colorBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Document click listener'ını tetiklemesin
    if (selectedNodeId !== null) {
        toggleColorPicker();
    } else {
        alert('Lütfen önce bir node seçin.');
        hideColorPicker(); // Emin olmak için gizle
    }
});

// --- Renk Paleti Fonksiyonları ---
const colors = [
    '#ffffff', '#f28b82', '#fbbc04', '#fff475', // Beyaz, Kırmızı, Turuncu, Sarı
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', // Yeşil, Turkuaz, Açık Mavi, Mavi
    '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed' // Mor, Pembe, Kahverengi, Gri
];

function populateColorPicker() {
    colorPicker.innerHTML = ''; // Önce içini temizle
    colors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.dataset.color = color;
        swatch.addEventListener('click', (e) => {
            applyColorToSelectedNode(e.target.dataset.color);
            hideColorPicker();
        });
        colorPicker.appendChild(swatch);
    });
}

function showColorPicker() {
    // Seçili node kontrolü hala gerekli, renklendirilecek node olmalı
    if (selectedNodeId === null) {
        alert("Lütfen önce renklendirmek için bir node seçin.");
        return;
    }
    // Paleti seçili node'un yakınına konumlandır - ESKİ YÖNTEM
    /*
    const selectedNode = nodes.find(n => n.id === selectedNodeId);
    if (!selectedNode) return;
    const nodeRect = selectedNode.element.getBoundingClientRect();
    const pickerWidth = 160; // Tahmini palet genişliği
    let left = nodeRect.right + 10;
    let top = nodeRect.top;
    */

    // YENİ YÖNTEM: Paleti fırça butonunun yanına konumlandır
    const buttonRect = colorBtn.getBoundingClientRect();
    const pickerWidth = 160; // Tahmini palet genişliği (CSS'e göre daha doğru hesaplanabilir)
    const pickerHeightEstimate = 100; // Tahmini palet yüksekliği

    let left = buttonRect.right + 10; // Butonun sağına
    let top = buttonRect.top; // Butonla aynı hizada

    // Ekran dışına taşmayı kontrol et
    if (left + pickerWidth > window.innerWidth) {
        // Sağa sığmazsa butonun soluna almayı deneyebiliriz, ama action bar genelde solda olduğu için bu pek olmaz.
        // Şimdilik sağ kenara yapışık bırakalım.
        left = window.innerWidth - pickerWidth - 10;
    }
    if (top + pickerHeightEstimate > window.innerHeight) {
        // Alta sığmazsa yukarı kaydır
        top = window.innerHeight - pickerHeightEstimate - 10;
    }
    if (top < 0) {
        top = 10;
    }
    if (left < 0) { // Soldan taşmayı engelle (genelde olmaz ama)
        left = 10;
    }

    colorPicker.style.left = `${window.scrollX + left}px`;
    colorPicker.style.top = `${window.scrollY + top}px`;
    colorPicker.style.display = 'grid';
}

function hideColorPicker() {
    colorPicker.style.display = 'none';
}

function toggleColorPicker() {
    if (colorPicker.style.display === 'none') {
        showColorPicker();
    } else {
        hideColorPicker();
    }
}

function applyColorToSelectedNode(color) {
    if (selectedNodeId === null) return;
    const selectedNode = nodes.find(n => n.id === selectedNodeId);
    if (selectedNode) {
        selectedNode.element.style.backgroundColor = color;
        // İsteğe bağlı: Rengi node objesinde de saklayabilirsin
        // selectedNode.color = color;
    }
}

// Palet dışına tıklanınca gizle
document.addEventListener('click', (event) => {
    if (colorPicker.style.display !== 'none' && !colorPicker.contains(event.target) && event.target !== colorBtn) {
        hideColorPicker();
    }
});

// Initial population of the color picker
populateColorPicker();

// --- Renk Paleti Fonksiyonları Sonu ---

// Function to delete a node and its connections
function deleteNode(nodeId) {
    const nodeIndex = nodes.findIndex(n => n.id === nodeId);
    if (nodeIndex === -1) return; // Node not found

    const nodeToDelete = nodes[nodeIndex];

    // Remove connection lines from SVG
    const linesToRemove = svgLines.querySelectorAll(`path[data-node-a-id="${nodeId}"], path[data-node-b-id="${nodeId}"]`);
    linesToRemove.forEach(line => svgLines.removeChild(line));

    // Remove the node element from the DOM
    canvas.removeChild(nodeToDelete.element);

    // Remove the node from the nodes array
    nodes.splice(nodeIndex, 1);

    // Important: Also remove references to this node from other nodes' connections
    // (This part was missing in the previous thought process but is crucial)
    nodes.forEach(node => {
        node.connections = node.connections.filter(conn => conn.connectedNodeId !== nodeId);
    });

    // Clear selection if the deleted node was selected
    if (selectedNodeId === nodeId) {
        selectedNodeId = null;
    }

    // Handle case where the center node might be deleted
    if (centerNodeData && centerNodeData.id === nodeId) {
        centerNodeData = nodes.length > 0 ? nodes[0] : null; // Assign a new center or null
        console.log("Center node deleted. New center node:", centerNodeData);
    }
}

// Add keydown listener for delete functionality
document.addEventListener('keydown', (event) => {
    // Check if the event target is the body or the canvas, to prevent deleting node while editing its text
    const activeElement = document.activeElement;
    const isEditingNode = activeElement && activeElement.classList.contains('node') && activeElement.isContentEditable;

    if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNodeId !== null && !isEditingNode) {
        event.preventDefault(); // Prevent default backspace behavior (like navigating back)
        deleteNode(selectedNodeId);
    }
});

// --- SVG Line Event Listeners ---

// --- YENİ: Çizgiye Sol Tık ile Silme Butonu Gösterme ---
svgLines.addEventListener('click', (event) => {
    // Sadece bir çizgiye tıklanırsa
    if (event.target.tagName.toLowerCase() === 'path') {
        const line = event.target;
        lineToDelete = line;
        // Path'in d değerinden başlangıç ve bitiş noktalarını çek
        const d = line.getAttribute('d');
        // d: Mx1,y1 C... x2,y2
        // Başlangıç: Mx1,y1  ... Bitiş: ... x2,y2
        // Son virgülden sonrasını bulmak için regex kullanalım
        const match = d.match(/M([\d.]+),([\d.]+)[^C]*C[^,]+,[^,]+ [^,]+,[^,]+ ([\d.]+),([\d.]+)/);
        let midX, midY;
        if (match) {
            const x1 = parseFloat(match[1]);
            const y1 = parseFloat(match[2]);
            const x2 = parseFloat(match[3]);
            const y2 = parseFloat(match[4]);
            midX = (x1 + x2) / 2;
            midY = (y1 + y2) / 2;
        } else {
            // Fallback: path'in bounding box'ı
            const bbox = line.getBBox();
            midX = bbox.x + bbox.width / 2;
            midY = bbox.y + bbox.height / 2;
        }
        // SVG'nin sayfa üzerindeki konumunu al (scroll durumları için)
        const svgRect = svgLines.getBoundingClientRect();
        lineDeleteBtn.style.left = `${window.scrollX + svgRect.left + midX - (lineDeleteBtn.offsetWidth / 2)}px`;
        lineDeleteBtn.style.top = `${window.scrollY + svgRect.top + midY - (lineDeleteBtn.offsetHeight / 2)}px`;
        lineDeleteBtn.style.display = 'block';
    } else {
        hideLineDeleteButton();
    }
});

// --- Dışarı Tıklayınca Silme Butonunu Gizle ---
document.addEventListener('click', (event) => {
    // Eğer tıklanan yer silme butonu değilse ve buton görünürse gizle
    if (lineDeleteBtn.style.display === 'block' && event.target !== lineDeleteBtn && event.target.tagName.toLowerCase() !== 'path') {
        hideLineDeleteButton();
    }
});

// Silme Butonu Click Handler (Değişiklik yok, aynı kalmalı)
lineDeleteBtn.addEventListener('click', () => {
    if (lineToDelete) {
        console.log("Delete button clicked for line:", lineToDelete.dataset.nodeAId, "-", lineToDelete.dataset.nodeBId);
        deleteConnectionLine(lineToDelete);
        hideLineDeleteButton(); // Butonu gizle
    }
});

// Butonu gizleme fonksiyonu (timer olmadan)
function hideLineDeleteButton() {
    lineDeleteBtn.style.display = 'none';
    lineToDelete = null;
    console.log("Delete button hidden.");
}

// Helper function to delete a line and update nodes
function deleteConnectionLine(lineElement) {
    const nodeAId = parseInt(lineElement.dataset.nodeAId, 10);
    const nodeBId = parseInt(lineElement.dataset.nodeBId, 10);

    // Remove line from SVG
    try {
        svgLines.removeChild(lineElement);
    } catch (error) {
        // Element zaten kaldırılmış olabilir, sorun değil.
        console.warn("Attempted to remove line that was already removed:", error);
    }


    // Update connections array in nodes
    const nodeA = nodes.find(n => n.id === nodeAId);
    const nodeB = nodes.find(n => n.id === nodeBId);

    if (nodeA) {
        nodeA.connections = nodeA.connections.filter(conn => conn.connectedNodeId !== nodeBId);
    }
    if (nodeB) {
        nodeB.connections = nodeB.connections.filter(conn => conn.connectedNodeId !== nodeAId);
    }

    console.log(`Deleted connection between node ${nodeAId} and ${nodeBId}`);
}

// --- End SVG Line Event Listeners ---

// Connect butonuna tıklayınca bağlantı modunu aç/kapa
connectBtn.addEventListener('click', () => {
    connectMode = !connectMode;
    document.body.classList.toggle('connect-mode', connectMode);
    if (connectMode) {
        enableConnectMode();
    } else {
        disableConnectMode();
    }
});

function enableConnectMode() {
    // Her node'a bağlantı noktası ekle
    nodes.forEach(node => {
        addConnectPoint(node);
    });
}

function disableConnectMode() {
    // Bağlantı noktalarını kaldır
    nodes.forEach(node => {
        removeConnectPoint(node);
    });
    // Geçici çizgi varsa kaldır
    if (tempLine) {
        svgLines.removeChild(tempLine);
        tempLine = null;
    }
    dragFromNodeId = null;
}

function addConnectPoint(node) {
    if (node.element.querySelector('.connect-point')) return; // Zaten varsa ekleme
    const point = document.createElement('div');
    point.className = 'connect-point';
    node.element.appendChild(point);

    // Sürükleme başlat
    point.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        dragFromNodeId = node.id;
        point.classList.add('active');
        // Geçici çizgi başlat
        const center = getNodeCenter(node.element);
        tempLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        tempLine.setAttribute('d', getCurvedPath(center.x, center.y, center.x, center.y));
        tempLine.setAttribute('stroke', '#2196f3');
        tempLine.setAttribute('stroke-width', '2');
        tempLine.setAttribute('stroke-dasharray', '4,2');
        svgLines.appendChild(tempLine);
        document.addEventListener('mousemove', handleConnectDrag);
        document.addEventListener('mouseup', handleConnectDrop);
    });
}

function removeConnectPoint(node) {
    const point = node.element.querySelector('.connect-point');
    if (point) point.remove();
}

function handleConnectDrag(e) {
    if (!tempLine || dragFromNodeId === null) return;
    const x = e.clientX;
    const y = e.clientY;
    tempLine.setAttribute('d', getCurvedPath(dragFromNodeId, selectedNodeId, x, y));
}

function handleConnectDrop(e) {
    if (!tempLine || dragFromNodeId === null) {
        cleanupConnectDrag();
        return;
    }
    // Hedef node'un connect-point'inde bırakıldı mı?
    const elem = document.elementFromPoint(e.clientX, e.clientY);
    if (elem && elem.classList.contains('connect-point')) {
        const toNodeElem = elem.parentElement;
        const toNode = nodes.find(n => n.element === toNodeElem);
        const fromNode = nodes.find(n => n.id === dragFromNodeId);
        if (toNode && fromNode && toNode.id !== fromNode.id && !connectionExists(fromNode, toNode)) {
            connectNodes(fromNode, toNode);
        }
    }
    cleanupConnectDrag();
}

function cleanupConnectDrag() {
    // Aktif connect-point'i kaldır
    nodes.forEach(node => {
        const point = node.element.querySelector('.connect-point');
        if (point) point.classList.remove('active');
    });
    if (tempLine) {
        svgLines.removeChild(tempLine);
        tempLine = null;
    }
    dragFromNodeId = null;
    document.removeEventListener('mousemove', handleConnectDrag);
    document.removeEventListener('mouseup', handleConnectDrop);
}

// --- Panel Açma/Kapama ---
backgroundBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    backgroundPanel.style.display = backgroundPanel.style.display === 'none' ? 'block' : 'none';
});
closeBgPanelBtn.addEventListener('click', () => {
    backgroundPanel.style.display = 'none';
});
document.addEventListener('click', (e) => {
    if (backgroundPanel.style.display !== 'none' && !backgroundPanel.contains(e.target) && e.target !== backgroundBtn) {
        backgroundPanel.style.display = 'none';
    }
});

// --- Desenler ---
function applyPattern(pattern, gridSize = 30) {
    canvasEl.classList.remove('bg-dots', 'bg-grid');
    canvasEl.style.backgroundImage = '';
    if (pattern === 'dots') {
        canvasEl.classList.add('bg-dots');
        setDotGridSize(gridSize);
    } else if (pattern === 'grid') {
        canvasEl.classList.add('bg-grid');
        setGridSize(gridSize);
    }
}
patternBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        applyPattern(btn.dataset.pattern, parseInt(gridSizeSlider.value));
    });
});

// --- Gradient ---
function applyGradient(type) {
    canvasEl.classList.remove('bg-gradient-pastel', 'bg-gradient-bluepurple', 'bg-gradient-pinkorange', 'bg-gradient-greenblue', 'bg-gradient-blackwhite', 'bg-gradient-image');
    if (type === 'pastel') {
        canvasEl.classList.add('bg-gradient-pastel');
    } else if (type === 'bluepurple') {
        canvasEl.classList.add('bg-gradient-bluepurple');
    } else if (type === 'pinkorange') {
        canvasEl.classList.add('bg-gradient-pinkorange');
    } else if (type === 'greenblue') {
        canvasEl.classList.add('bg-gradient-greenblue');
    } else if (type === 'image') {
        canvasEl.classList.add('bg-gradient-image');
    }
}
gradientBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const gradient = btn.dataset.gradient;
        // Önce mevcut gradient sınıflarını temizle
        canvas.classList.forEach(className => {
            if (className.startsWith('bg-gradient-')) {
                canvas.classList.remove(className);
            }
        });
        // Mevcut desen sınıflarını da temizle
        canvas.classList.remove('bg-dots', 'bg-grid');

        if (gradient && gradient !== 'none') {
            canvas.classList.add(`bg-gradient-${gradient}`);
        } // 'none' ise sadece temizlenmiş olur
    });
});

// --- Tema ---
function applyTheme(theme) {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-minimal', 'theme-colorful', 'theme-notebook');
    if (theme) {
        document.body.classList.add('theme-' + theme);
    }
}
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Tema değerini doğru şekilde al
        const theme = btn.dataset.theme;

        // Varsa desen ve gradient'leri temizle (bu işlevi koru)
        canvas.classList.remove('bg-dots', 'bg-grid');
        canvas.classList.forEach(className => {
            if (className.startsWith('bg-gradient-') || className === 'bg-image') {
                canvas.classList.remove(className);
            }
        });
        removeBgImageBtn.style.display = 'none';
        bgImageInput.value = '';
        canvas.style.backgroundImage = '';

        // Temayı uygula
        if (theme) {
            applyTheme(theme);
        }
    });
});

// --- Izgara Boyutu ---
function setDotGridSize(size) {
    // Noktalı desen için background-size ve SVG pattern
    canvasEl.style.setProperty('--dot-grid-size', size + 'px');
}

function setGridSize(size) {
    // Kareli desen için background-size
    canvasEl.style.setProperty('--grid-size', size + 'px');
}
gridSizeSlider.addEventListener('input', () => {
    gridSizeValue.textContent = gridSizeSlider.value;
    // Aktif desen hangisiyse ona uygula
    if (canvasEl.classList.contains('bg-dots')) {
        setDotGridSize(parseInt(gridSizeSlider.value));
    } else if (canvasEl.classList.contains('bg-grid')) {
        setGridSize(parseInt(gridSizeSlider.value));
    }
});

// --- Görsel Yükleme ---
bgImageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Görsel yüklenince desen ve gradientleri kaldır
            canvas.classList.remove('bg-dots', 'bg-grid');
            canvas.classList.forEach(className => {
                if (className.startsWith('bg-gradient-')) {
                    canvas.classList.remove(className);
                }
            });
            canvas.style.backgroundImage = `url('${e.target.result}')`;
            canvas.classList.add('bg-image');
            removeBgImageBtn.style.display = 'inline-block'; // Kaldır butonunu göster
        }
        reader.readAsDataURL(file);
    }
});
removeBgImageBtn.addEventListener('click', () => {
    canvas.style.backgroundImage = '';
    canvas.classList.remove('bg-image');
    bgImageInput.value = ''; // Dosya inputunu temizle
    removeBgImageBtn.style.display = 'none';
});

// --- Başlangıçta default değerler ---
applyPattern('none');
applyGradient('none');
applyTheme('light');