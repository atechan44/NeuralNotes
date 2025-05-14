import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NoteCard from '../../components/NoteCard'

describe('NoteCard', () => {
  it('renders the title and content', () => {
    render(
      <NoteCard 
        id="1"
        title="Test Note" 
        content="This is a test note content" 
        date={new Date().toISOString()}
        tags={['test']}
      />
    )
    
    expect(screen.getByText('Test Note')).toBeInTheDocument()
    expect(screen.getByText('This is a test note content')).toBeInTheDocument()
  })
  
  it('renders tags correctly', () => {
    render(
      <NoteCard 
        id="1"
        title="Test Note" 
        content="This is a test note content" 
        date={new Date().toISOString()}
        tags={['important', 'work']}
      />
    )
    
    expect(screen.getByText('important')).toBeInTheDocument()
    expect(screen.getByText('work')).toBeInTheDocument()
  })
}) 