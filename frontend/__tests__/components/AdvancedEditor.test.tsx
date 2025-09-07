import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdvancedEditor from '../../components/AdvancedEditor';

// Mock Monaco Editor
jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: ({ onChange, onMount, value, theme, language, options }: any) => {
    const handleChange = (e: any) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    const handleMount = () => {
      if (onMount) {
        onMount({
          getValue: () => value || '',
          setValue: jest.fn(),
          getModel: () => ({
            getLanguageId: () => language || 'plaintext',
          }),
          onDidChangeModelContent: jest.fn(),
          onDidChangeCursorPosition: jest.fn(),
          dispose: jest.fn(),
        });
      }
    };

    return (
      <div data-testid="monaco-editor" onMount={handleMount}>
        <textarea
          data-testid="editor-textarea"
          value={value || ''}
          onChange={handleChange}
          style={{ width: '100%', height: '400px' }}
        />
      </div>
    );
  },
}));

describe('AdvancedEditor', () => {
  const defaultProps = {
    content: 'console.log("Hello World");',
    filename: 'test.js',
    theme: 'dark',
    onContentChange: jest.fn(),
    fontSize: 14,
    wordWrap: false,
    minimap: true,
    lineNumbers: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<AdvancedEditor {...defaultProps} />);
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  it('displays the correct content', () => {
    render(<AdvancedEditor {...defaultProps} />);
    expect(screen.getByTestId('editor-textarea')).toHaveValue('console.log("Hello World");');
  });

  it('calls onContentChange when content changes', async () => {
    const mockOnContentChange = jest.fn();
    render(<AdvancedEditor {...defaultProps} onContentChange={mockOnContentChange} />);
    
    const textarea = screen.getByTestId('editor-textarea');
    fireEvent.change(textarea, { target: { value: 'const x = 1;' } });
    
    await waitFor(() => {
      expect(mockOnContentChange).toHaveBeenCalledWith('const x = 1;');
    });
  });

  it('detects JavaScript language for .js files', () => {
    render(<AdvancedEditor {...defaultProps} filename="test.js" />);
    // Monaco editor should receive language: 'javascript'
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  it('detects TypeScript language for .ts files', () => {
    render(<AdvancedEditor {...defaultProps} filename="test.ts" />);
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  it('handles undefined filename gracefully', () => {
    render(<AdvancedEditor {...defaultProps} filename={undefined as any} />);
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  it('applies dark theme correctly', () => {
    render(<AdvancedEditor {...defaultProps} theme="dark" />);
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  it('applies light theme correctly', () => {
    render(<AdvancedEditor {...defaultProps} theme="light" />);
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  it('handles theme changes', () => {
    const { rerender } = render(<AdvancedEditor {...defaultProps} theme="dark" />);
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
    
    rerender(<AdvancedEditor {...defaultProps} theme="light" />);
    expect(screen.getByTestId('monaco-editor')).toBeInTheDocument();
  });

  it('handles empty content', () => {
    render(<AdvancedEditor {...defaultProps} content="" />);
    expect(screen.getByTestId('editor-textarea')).toHaveValue('');
  });

  it('handles null content', () => {
    render(<AdvancedEditor {...defaultProps} content={null as any} />);
    expect(screen.getByTestId('editor-textarea')).toHaveValue('');
  });
});
