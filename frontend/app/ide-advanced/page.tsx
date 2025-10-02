'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
    Code2,
    Terminal,
    FileText,
    FolderOpen,
    Play,
    Settings,
    Search,
    Download,
    Upload,
    GitBranch,
    Zap,
    Eye,
    EyeOff,
    Maximize2,
    Minimize2,
    X,
    Plus,
    Save,
    RefreshCw,
    Monitor,
    Smartphone,
    Tablet,
    Globe,
    Palette,
    Keyboard,
    MousePointer,
    Layers,
    Activity,
    Cpu,
    MemoryStick,
    HardDrive,
    Wifi,
    Battery,
    Volume2,
    Sun,
    Moon,
    MonitorSpeaker,
    Copy,
    Scissors,
    Clipboard,
    Undo,
    Redo,
    Search as SearchIcon,
    Replace,
    ZoomIn,
    ZoomOut,
    RotateCcw,
    RotateCw,
    Grid3X3,
    Layout,
    Split,
    Columns,
    Rows,
    Square,
    Circle,
    Triangle,
    Star,
    Heart,
    Smile,
    Frown,
    Meh,
    ThumbsUp,
    ThumbsDown,
    Check,
    XCircle,
    AlertCircle,
    Info,
    HelpCircle,
    ExternalLink,
    Link,
    Unlink,
    Bookmark,
    Tag,
    Tags,
    Filter,
    SortAsc,
    SortDesc,
    ArrowUp,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Move,
    Move3D,
    Rotate3D,
    Scale,
    Crop,
    Eraser,
    Pencil,
    Pen,
    Highlighter,
    Paintbrush,
    Droplet,
    Sparkles,
    Wand2,
    Flashlight,
    Lightbulb,
    Flame,
    Snowflake,
    Cloud,
    CloudRain,
    CloudSnow,
    CloudLightning,
    Sunrise,
    Sunset,
    Calendar,
    Clock,
    Timer,
    Hourglass,
    Watch,
    AlarmClock,
    Bell,
    VolumeX,
    Volume1,
    Mic,
    MicOff,
    Headphones,
    Speaker,
    Radio,
    Tv,
    Camera,
    Video,
    VideoOff,
    Image,
    Images,
    FileImage,
    FileVideo,
    FileAudio,
    FileMusic,
    FileText as FileTextIcon,
    FileCode,
    FileJson,
    File,
    Folder,
    FolderOpen as FolderOpenIcon,
    FolderPlus,
    FolderMinus,
    FolderX,
    FolderCheck,
    FolderEdit,
    FolderLock,
    Archive,
    ArchiveRestore,
    Package,
    PackageOpen,
    PackageCheck,
    PackageX,
    PackagePlus,
    PackageMinus,
    Box,
    Boxes,
    Container,
    Database,
    Server,
    Power,
    PowerOff,
    Plug,
    Unplug,
    Cable,
    Usb,
    Bluetooth,
    WifiOff,
    Signal,
    SignalZero,
    SignalLow,
    SignalMedium,
    SignalHigh,
    Globe as GlobeIcon,
    Globe2,
    Map,
    MapPin,
    Navigation,
    Compass,
    Target,
    Crosshair,
    Focus,
    Scan,
    ScanLine,
    QrCode,
    Barcode,
    Hash,
    AtSign,
    Percent,
    DollarSign,
    Euro,
    CreditCard,
    Banknote,
    Coins,
    Wallet,
    Receipt,
    Calculator,
    Ruler,
    Compass as CompassIcon,
    Triangle as TriangleIcon,
    Square as SquareIcon,
    Circle as CircleIcon,
    Pentagon,
    Octagon,
    Diamond,
    ArrowUp as ArrowUpIcon,
    ArrowDown as ArrowDownIcon,
    ArrowLeft as ArrowLeftIcon,
    ArrowRight as ArrowRightIcon,
    ArrowUpLeft,
    ArrowUpRight,
    ArrowDownLeft,
    ArrowDownRight,
    ArrowUpDown,
    ArrowLeftRight,
    ArrowUpCircle,
    ArrowDownCircle,
    ArrowLeftCircle,
    ArrowRightCircle,
    ArrowUpSquare,
    ArrowDownSquare,
    ArrowLeftSquare,
    ArrowRightSquare
} from 'lucide-react'

// Componentes da IDE
import MonacoEditor from '@/components/IDE/MonacoEditor'
import FileExplorer from '@/components/IDE/FileExplorer'
import TerminalPanel from '@/components/IDE/TerminalPanel'
import PreviewPanel from '@/components/IDE/PreviewPanel'
import StatusBar from '@/components/IDE/StatusBar'
import CommandPalette from '@/components/IDE/CommandPalette'
import ActivityBar from '@/components/IDE/ActivityBar'
import TabManager from '@/components/IDE/TabManager'

interface File {
    id: string
    name: string
    content: string
    language: string
    path: string
    isModified: boolean
    isActive: boolean
    size?: number
    created?: Date
    modified?: Date
    permissions?: string
    encoding?: string
}

interface Project {
    id: string
    name: string
    files: File[]
    rootPath: string
    lastModified: Date
    description: string
    version: string
    author: string
    license: string
    tags: string[]
}

interface EditorSettings {
    fontSize: number
    fontFamily: string
    tabSize: number
    insertSpaces: boolean
    wordWrap: 'off' | 'on' | 'wordWrapColumn' | 'bounded'
    lineNumbers: 'on' | 'off' | 'relative' | 'interval'
    minimap: boolean
    bracketPairColorization: boolean
    autoClosingBrackets: boolean
    autoClosingQuotes: boolean
    autoIndent: boolean
    formatOnSave: boolean
    formatOnPaste: boolean
    suggestOnTriggerCharacters: boolean
    acceptSuggestionOnEnter: boolean
    acceptSuggestionOnCommitCharacter: boolean
    quickSuggestions: boolean
    parameterHints: boolean
    hover: boolean
    contextMenu: boolean
    mouseWheelZoom: boolean
    smoothScrolling: boolean
    cursorBlinking: 'blink' | 'smooth' | 'phase' | 'expand' | 'solid'
    cursorSmoothCaretAnimation: boolean
    cursorStyle: 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin'
    renderWhitespace: 'none' | 'boundary' | 'selection' | 'all'
    renderControlCharacters: boolean
    renderIndentGuides: boolean
    highlightActiveIndentGuide: boolean
    rulers: number[]
    colorDecorators: boolean
    lightbulb: boolean
    codeLens: boolean
    folding: boolean
    foldingStrategy: 'auto' | 'indentation'
    showFoldingControls: 'always' | 'mouseover'
    unfoldOnClickAfterEnd: boolean
    matchBrackets: boolean
    find: {
        seedSearchStringFromSelection: boolean
        autoFindInSelection: 'never' | 'always' | 'multiline'
        addExtraSpaceOnFocus: boolean
        globalFindClipboard: boolean
        preserveCase: boolean
    }
}

interface LayoutSettings {
    type: 'split' | 'tabs' | 'grid'
    panels: {
        fileExplorer: boolean
        terminal: boolean
        preview: boolean
        debug: boolean
        output: boolean
        problems: boolean
        search: boolean
        git: boolean
        extensions: boolean
    }
    sizes: {
        fileExplorer: number
        editor: number
        terminal: number
        preview: number
    }
}

interface ThemeSettings {
    name: 'light' | 'dark' | 'fenix'
    colors: {
        background: string
        foreground: string
        primary: string
        secondary: string
        accent: string
        success: string
        warning: string
        error: string
        info: string
    }
    customCSS: string
}

export default function AdvancedIDEPage() {
    // Estados principais
    const [currentProject, setCurrentProject] = useState<Project | null>(null)
    const [activeFile, setActiveFile] = useState<File | null>(null)
    const [isTerminalOpen, setIsTerminalOpen] = useState(true)
    const [isPreviewOpen, setIsPreviewOpen] = useState(true)
    const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(true)
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [isDebugOpen, setIsDebugOpen] = useState(false)
    const [isOutputOpen, setIsOutputOpen] = useState(false)
    const [isProblemsOpen, setIsProblemsOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isGitOpen, setIsGitOpen] = useState(false)
    const [isExtensionsOpen, setIsExtensionsOpen] = useState(false)
    const [activeSettingsTab, setActiveSettingsTab] = useState<'editor' | 'theme' | 'layout' | 'keyboard' | 'extensions'>('editor')

    // Estados de tema e layout
    const [theme, setTheme] = useState<'light' | 'dark' | 'fenix'>('fenix')
    const [layout, setLayout] = useState<'split' | 'tabs' | 'grid'>('split')
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Estados de configurações
    const [editorSettings, setEditorSettings] = useState<EditorSettings>({
        fontSize: 14,
        fontFamily: 'Fira Code, Consolas, Monaco, monospace',
        tabSize: 4,
        insertSpaces: true,
        wordWrap: 'on',
        lineNumbers: 'on',
        minimap: true,
        bracketPairColorization: true,
        autoClosingBrackets: true,
        autoClosingQuotes: true,
        autoIndent: true,
        formatOnSave: true,
        formatOnPaste: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: true,
        acceptSuggestionOnCommitCharacter: true,
        quickSuggestions: true,
        parameterHints: true,
        hover: true,
        contextMenu: true,
        mouseWheelZoom: true,
        smoothScrolling: true,
        cursorBlinking: 'blink',
        cursorSmoothCaretAnimation: true,
        cursorStyle: 'line',
        renderWhitespace: 'boundary',
        renderControlCharacters: false,
        renderIndentGuides: true,
        highlightActiveIndentGuide: true,
        rulers: [80, 120],
        colorDecorators: true,
        lightbulb: true,
        codeLens: true,
        folding: true,
        foldingStrategy: 'auto',
        showFoldingControls: 'mouseover',
        unfoldOnClickAfterEnd: false,
        matchBrackets: true,
        find: {
            seedSearchStringFromSelection: true,
            autoFindInSelection: 'never',
            addExtraSpaceOnFocus: false,
            globalFindClipboard: false,
            preserveCase: false
        }
    })

    const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
        type: 'split',
        panels: {
            fileExplorer: true,
            terminal: true,
            preview: true,
            debug: false,
            output: false,
            problems: false,
            search: false,
            git: false,
            extensions: false
        },
        sizes: {
            fileExplorer: 250,
            editor: 600,
            terminal: 200,
            preview: 400
        }
    })

    const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
        name: 'fenix',
        colors: {
            background: '#1a1a2e',
            foreground: '#ffffff',
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#f093fb',
            success: '#4ade80',
            warning: '#fbbf24',
            error: '#f87171',
            info: '#60a5fa'
        },
        customCSS: ''
    })

    // Estados do editor
    const [editorContent, setEditorContent] = useState('')
    const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })
    const [selectedText, setSelectedText] = useState('')
    const [findText, setFindText] = useState('')
    const [replaceText, setReplaceText] = useState('')
    const [isFindOpen, setIsFindOpen] = useState(false)

    // Estados do terminal
    const [terminalHistory, setTerminalHistory] = useState<string[]>([])
    const [currentCommand, setCurrentCommand] = useState('')
    const [terminalOutput, setTerminalOutput] = useState<string[]>([])
    const [workingDirectory, setWorkingDirectory] = useState('/')

    // Estados do preview
    const [previewContent, setPreviewContent] = useState('')
    const [previewType, setPreviewType] = useState<'html' | 'markdown' | 'image' | 'json'>('html')
    const [previewUrl, setPreviewUrl] = useState('')

    // Refs
    const editorRef = useRef<any>(null)
    const terminalRef = useRef<HTMLDivElement>(null)
    const fileExplorerRef = useRef<HTMLDivElement>(null)

    // Linguagens suportadas (60+)
    const supportedLanguages = [
        'javascript', 'typescript', 'python', 'java', 'csharp', 'cpp', 'c', 'go', 'rust', 'php',
        'ruby', 'swift', 'kotlin', 'dart', 'scala', 'clojure', 'haskell', 'erlang', 'elixir',
        'lua', 'perl', 'r', 'matlab', 'octave', 'fortran', 'cobol', 'pascal', 'ada', 'prolog',
        'html', 'css', 'scss', 'sass', 'less', 'stylus', 'xml', 'yaml', 'json', 'toml',
        'markdown', 'asciidoc', 'rst', 'tex', 'latex', 'sql', 'mysql', 'postgresql', 'sqlite',
        'bash', 'powershell', 'batch', 'shell', 'dockerfile', 'makefile', 'cmake', 'gradle',
        'maven', 'ant', 'groovy', 'julia', 'nim', 'crystal', 'zig', 'v', 'odin', 'jai'
    ]

    // Inicialização
    useEffect(() => {
        initializeIDE()
        loadUserPreferences()
    }, [])

    const initializeIDE = () => {
        // Criar projeto padrão
        const defaultProject: Project = {
            id: 'default',
            name: 'Meu Projeto',
            rootPath: '/workspace',
            lastModified: new Date(),
            description: 'Projeto padrão da Fênix IDE',
            version: '1.0.0',
            author: 'Fênix IDE',
            license: 'MIT',
            tags: ['javascript', 'html', 'css'],
            files: [
                {
                    id: 'welcome',
                    name: 'welcome.html',
                    content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo à Fênix IDE</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            text-align: center;
            color: white;
            max-width: 600px;
            padding: 2rem;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        .feature {
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Fênix IDE</h1>
        <p>Sua IDE completa para desenvolvimento web e muito mais!</p>
        <div class="features">
            <div class="feature">✨ 60+ Linguagens</div>
            <div class="feature">🎨 Preview em Tempo Real</div>
            <div class="feature">💻 Terminal Integrado</div>
            <div class="feature">🤖 IA Assistente</div>
        </div>
    </div>
</body>
</html>`,
                    language: 'html',
                    path: '/welcome.html',
                    isModified: false,
                    isActive: true
                }
            ]
        }

        setCurrentProject(defaultProject)
        setActiveFile(defaultProject.files[0])
        setEditorContent(defaultProject.files[0].content)
    }

    const loadUserPreferences = () => {
        const savedTheme = localStorage.getItem('fenix-ide-theme')
        const savedLayout = localStorage.getItem('fenix-ide-layout')
        const savedTerminal = localStorage.getItem('fenix-ide-terminal')
        const savedPreview = localStorage.getItem('fenix-ide-preview')

        if (savedTheme) setTheme(savedTheme as any)
        if (savedLayout) setLayout(savedLayout as any)
        if (savedTerminal) setIsTerminalOpen(JSON.parse(savedTerminal))
        if (savedPreview) setIsPreviewOpen(JSON.parse(savedPreview))
    }

    const saveUserPreferences = () => {
        localStorage.setItem('fenix-ide-theme', theme)
        localStorage.setItem('fenix-ide-layout', layout)
        localStorage.setItem('fenix-ide-terminal', JSON.stringify(isTerminalOpen))
        localStorage.setItem('fenix-ide-preview', JSON.stringify(isPreviewOpen))
    }

    // Handlers
    const handleFileSelect = (file: File) => {
        setActiveFile(file)
        setEditorContent(file.content)
        setPreviewContent(file.content)
        setPreviewType(file.language === 'html' ? 'html' : 'markdown')
    }

    const handleContentChange = (content: string) => {
        setEditorContent(content)
        if (activeFile) {
            const updatedFile = { ...activeFile, content, isModified: true }
            setActiveFile(updatedFile)

            // Atualizar preview em tempo real
            setPreviewContent(content)
        }
    }

    const handleSave = () => {
        if (activeFile) {
            const updatedFile = { ...activeFile, content: editorContent, isModified: false }
            setActiveFile(updatedFile)

            // Salvar no localStorage
            const savedProjects = JSON.parse(localStorage.getItem('fenix-ide-projects') || '[]')
            const projectIndex = savedProjects.findIndex((p: Project) => p.id === currentProject?.id)

            if (projectIndex >= 0) {
                savedProjects[projectIndex] = currentProject
            } else {
                savedProjects.push(currentProject)
            }

            localStorage.setItem('fenix-ide-projects', JSON.stringify(savedProjects))
        }
    }

    const handleCreateFile = () => {
        const fileName = prompt('Nome do arquivo (ex: script.js):')
        if (!fileName) return

        // Detectar linguagem pela extensão
        const extension = fileName.split('.').pop()?.toLowerCase()
        const languageMap: { [key: string]: string } = {
            'js': 'javascript',
            'jsx': 'javascript',
            'ts': 'typescript',
            'tsx': 'typescript',
            'html': 'html',
            'css': 'css',
            'py': 'python',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c',
            'go': 'go',
            'rs': 'rust',
            'php': 'php',
            'rb': 'ruby',
            'swift': 'swift',
            'kt': 'kotlin',
            'dart': 'dart',
            'scala': 'scala',
            'clj': 'clojure',
            'hs': 'haskell',
            'erl': 'erlang',
            'ex': 'elixir',
            'lua': 'lua',
            'pl': 'perl',
            'r': 'r',
            'm': 'matlab',
            'f90': 'fortran',
            'cob': 'cobol',
            'pas': 'pascal',
            'ada': 'ada',
            'pro': 'prolog',
            'sql': 'sql',
            'sh': 'bash',
            'ps1': 'powershell',
            'bat': 'batch',
            'dockerfile': 'dockerfile',
            'makefile': 'makefile',
            'cmake': 'cmake',
            'xml': 'xml',
            'yaml': 'yaml',
            'yml': 'yaml',
            'json': 'json',
            'toml': 'toml',
            'ini': 'ini',
            'md': 'markdown',
            'txt': 'text'
        }

        const language = languageMap[extension || ''] || 'text'
        const newFile: File = {
            id: `file-${Date.now()}`,
            name: fileName,
            content: getDefaultContent(language),
            language: language,
            path: `/${fileName}`,
            isModified: false,
            isActive: false,
            size: 0,
            created: new Date(),
            modified: new Date(),
            permissions: 'rw-r--r--',
            encoding: 'utf-8'
        }

        if (currentProject) {
            const updatedProject = {
                ...currentProject,
                files: [...currentProject.files, newFile],
                lastModified: new Date()
            }
            setCurrentProject(updatedProject)
            setActiveFile(newFile)
            setEditorContent(newFile.content)
            setPreviewContent(newFile.content)
            setPreviewType(language === 'html' ? 'html' : 'markdown')
        }
    }

    const getDefaultContent = (language: string): string => {
        const templates: { [key: string]: string } = {
            'javascript': `// Novo arquivo JavaScript
console.log('Olá, mundo!');

function exemplo() {
    return 'Função de exemplo';
}

exemplo();`,
            'typescript': `// Novo arquivo TypeScript
interface Exemplo {
    nome: string;
    idade: number;
}

const exemplo: Exemplo = {
    nome: 'João',
    idade: 30
};

console.log(exemplo);`,
            'html': `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Documento</title>
</head>
<body>
    <h1>Olá, mundo!</h1>
    <p>Este é um novo arquivo HTML.</p>
</body>
</html>`,
            'css': `/* Novo arquivo CSS */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    line-height: 1.6;
}`,
            'python': `# Novo arquivo Python
def main():
    print("Olá, mundo!")
    
    # Exemplo de função
    resultado = calcular(5, 3)
    print(f"Resultado: {resultado}")

def calcular(a, b):
    return a + b

if __name__ == "__main__":
    main()`,
            'java': `// Novo arquivo Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Olá, mundo!");
        
        // Exemplo de método
        int resultado = calcular(5, 3);
        System.out.println("Resultado: " + resultado);
    }
    
    public static int calcular(int a, int b) {
        return a + b;
    }
}`,
            'cpp': `// Novo arquivo C++
#include <iostream>
using namespace std;

int main() {
    cout << "Olá, mundo!" << endl;
    
    // Exemplo de função
    int resultado = calcular(5, 3);
    cout << "Resultado: " << resultado << endl;
    
    return 0;
}

int calcular(int a, int b) {
    return a + b;
}`,
            'go': `// Novo arquivo Go
package main

import "fmt"

func main() {
    fmt.Println("Olá, mundo!")
    
    // Exemplo de função
    resultado := calcular(5, 3)
    fmt.Printf("Resultado: %d\n", resultado)
}

func calcular(a, b int) int {
    return a + b
}`,
            'rust': `// Novo arquivo Rust
fn main() {
    println!("Olá, mundo!");
    
    // Exemplo de função
    let resultado = calcular(5, 3);
    println!("Resultado: {}", resultado);
}

fn calcular(a: i32, b: i32) -> i32 {
    a + b
}`,
            'php': `<?php
// Novo arquivo PHP
echo "Olá, mundo!\n";

// Exemplo de função
$resultado = calcular(5, 3);
echo "Resultado: " . $resultado . "\n";

function calcular($a, $b) {
    return $a + $b;
}
?>`,
            'ruby': `# Novo arquivo Ruby
puts "Olá, mundo!"

# Exemplo de método
resultado = calcular(5, 3)
puts "Resultado: #{resultado}"

def calcular(a, b)
    a + b
end`,
            'swift': `// Novo arquivo Swift
import Foundation

print("Olá, mundo!")

// Exemplo de função
let resultado = calcular(a: 5, b: 3)
print("Resultado: \\(resultado)")

func calcular(a: Int, b: Int) -> Int {
    return a + b
}`,
            'kotlin': `// Novo arquivo Kotlin
fun main() {
    println("Olá, mundo!")
    
    // Exemplo de função
    val resultado = calcular(5, 3)
    println("Resultado: $resultado")
}

fun calcular(a: Int, b: Int): Int {
    return a + b
}`,
            'dart': `// Novo arquivo Dart
void main() {
  print('Olá, mundo!');
  
  // Exemplo de função
  int resultado = calcular(5, 3);
  print('Resultado: $resultado');
}

int calcular(int a, int b) {
  return a + b;
}`,
            'scala': `// Novo arquivo Scala
object Main {
  def main(args: Array[String]): Unit = {
    println("Olá, mundo!")
    
    // Exemplo de função
    val resultado = calcular(5, 3)
    println(s"Resultado: $resultado")
  }
  
  def calcular(a: Int, b: Int): Int = {
    a + b
  }
}`,
            'clojure': `;; Novo arquivo Clojure
(println "Olá, mundo!")

;; Exemplo de função
(defn calcular [a b]
  (+ a b))

(def resultado (calcular 5 3))
(println (str "Resultado: " resultado))`,
            'haskell': `-- Novo arquivo Haskell
main :: IO ()
main = do
    putStrLn "Olá, mundo!"
    
    -- Exemplo de função
    let resultado = calcular 5 3
    putStrLn $ "Resultado: " ++ show resultado

calcular :: Int -> Int -> Int
calcular a b = a + b`,
            'erlang': `%% Novo arquivo Erlang
-module(main).
-export([main/0]).

main() ->
    io:format("Olá, mundo!~n"),
    
    %% Exemplo de função
    Resultado = calcular(5, 3),
    io:format("Resultado: ~p~n", [Resultado]).

calcular(A, B) ->
    A + B.`,
            'elixir': `# Novo arquivo Elixir
IO.puts("Olá, mundo!")

# Exemplo de função
resultado = calcular(5, 3)
IO.puts("Resultado: #{resultado}")

defp calcular(a, b) do
  a + b
end`,
            'lua': `-- Novo arquivo Lua
print("Olá, mundo!")

-- Exemplo de função
local resultado = calcular(5, 3)
print("Resultado: " .. resultado)

function calcular(a, b)
    return a + b
end`,
            'perl': `# Novo arquivo Perl
use strict;
use warnings;

print "Olá, mundo!\n";

# Exemplo de função
my $resultado = calcular(5, 3);
print "Resultado: $resultado\n";

sub calcular {
    my ($a, $b) = @_;
    return $a + $b;
}`,
            'r': `# Novo arquivo R
print("Olá, mundo!")

# Exemplo de função
resultado <- calcular(5, 3)
print(paste("Resultado:", resultado))

calcular <- function(a, b) {
  return(a + b)
}`,
            'matlab': `% Novo arquivo MATLAB
disp('Olá, mundo!');

% Exemplo de função
resultado = calcular(5, 3);
fprintf('Resultado: %d\n', resultado);

function resultado = calcular(a, b)
    resultado = a + b;
end`,
            'fortran': `! Novo arquivo Fortran
program main
    implicit none
    integer :: resultado
    
    print *, 'Olá, mundo!'
    
    ! Exemplo de função
    resultado = calcular(5, 3)
    print *, 'Resultado:', resultado
    
contains
    function calcular(a, b) result(res)
        integer, intent(in) :: a, b
        integer :: res
        res = a + b
    end function calcular
end program main`,
            'cobol': `       IDENTIFICATION DIVISION.
       PROGRAM-ID. MAIN.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 RESULTADO PIC 9(3).
       
       PROCEDURE DIVISION.
           DISPLAY 'Olá, mundo!'.
           
           *> Exemplo de função
           COMPUTE RESULTADO = 5 + 3.
           DISPLAY 'Resultado: ' RESULTADO.
           
           STOP RUN.`,
            'pascal': `program Main;
var
    resultado: integer;

function calcular(a, b: integer): integer;
begin
    calcular := a + b;
end;

begin
    writeln('Olá, mundo!');
    
    { Exemplo de função }
    resultado := calcular(5, 3);
    writeln('Resultado: ', resultado);
end.`,
            'ada': `-- Novo arquivo Ada
with Ada.Text_IO; use Ada.Text_IO;

procedure Main is
    function Calcular(A, B : Integer) return Integer is
    begin
        return A + B;
    end Calcular;
    
    Resultado : Integer;
begin
    Put_Line("Olá, mundo!");
    
    -- Exemplo de função
    Resultado := Calcular(5, 3);
    Put_Line("Resultado: " & Integer'Image(Resultado));
end Main;`,
            'prolog': `% Novo arquivo Prolog
:- initialization(main).

main :-
    write('Olá, mundo!'), nl,
    
    % Exemplo de predicado
    calcular(5, 3, Resultado),
    write('Resultado: '), write(Resultado), nl.

calcular(A, B, Resultado) :-
    Resultado is A + B.`,
            'sql': `-- Novo arquivo SQL
-- Criar tabela de exemplo
CREATE TABLE usuarios (
    id INT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100)
);

-- Inserir dados de exemplo
INSERT INTO usuarios (id, nome, email) VALUES
(1, 'João', 'joao@email.com'),
(2, 'Maria', 'maria@email.com');

-- Consultar dados
SELECT * FROM usuarios;`,
            'bash': `#!/bin/bash
# Novo arquivo Bash

echo "Olá, mundo!"

# Exemplo de função
calcular() {
    local a=$1
    local b=$2
    echo $((a + b))
}

resultado=$(calcular 5 3)
echo "Resultado: $resultado"`,
            'powershell': `# Novo arquivo PowerShell
Write-Host "Olá, mundo!"

# Exemplo de função
function Calcular {
    param($a, $b)
    return $a + $b
}

$resultado = Calcular 5 3
Write-Host "Resultado: $resultado"`,
            'batch': `@echo off
REM Novo arquivo Batch

echo Olá, mundo!

REM Exemplo de função
call :calcular 5 3
echo Resultado: %resultado%
goto :eof

:calcular
set /a resultado=%1 + %2
goto :eof`,
            'dockerfile': `# Novo arquivo Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]`,
            'makefile': `# Novo arquivo Makefile
CC = gcc
CFLAGS = -Wall -g

TARGET = main
SOURCES = main.c

$(TARGET): $(SOURCES)
	$(CC) $(CFLAGS) -o $(TARGET) $(SOURCES)

clean:
	rm -f $(TARGET)

.PHONY: clean`,
            'cmake': `# Novo arquivo CMakeLists.txt
cmake_minimum_required(VERSION 3.10)
project(MeuProjeto)

set(CMAKE_CXX_STANDARD 17)

add_executable(main main.cpp)

target_compile_features(main PRIVATE cxx_std_17)`,
            'xml': `<?xml version="1.0" encoding="UTF-8"?>
<root>
    <element>
        <name>Exemplo</name>
        <value>123</value>
    </element>
</root>`,
            'yaml': `# Novo arquivo YAML
name: MeuProjeto
version: 1.0.0
description: Exemplo de arquivo YAML

dependencies:
  - node
  - npm

scripts:
  start: "node index.js"
  test: "npm test"`,
            'json': `{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "Exemplo de arquivo JSON",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "npm test"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}`,
            'toml': `# Novo arquivo TOML
name = "meu-projeto"
version = "1.0.0"
description = "Exemplo de arquivo TOML"

[dependencies]
express = "4.18.0"
react = "18.0.0"

[scripts]
start = "node index.js"
test = "npm test"`,
            'ini': `; Novo arquivo INI
[config]
name = MeuProjeto
version = 1.0.0
debug = true

[database]
host = localhost
port = 5432
name = mydb

[api]
base_url = https://api.exemplo.com
timeout = 30`,
            'markdown': `# Novo Documento

Este é um novo arquivo Markdown.

## Seção 1

Aqui você pode escrever texto formatado.

### Subseção

- Item 1
- Item 2
- Item 3

## Código

\`\`\`javascript
console.log('Olá, mundo!');
\`\`\`

## Link

[Visite nosso site](https://exemplo.com)`,
            'text': `Novo arquivo de texto

Este é um arquivo de texto simples.

Você pode escrever qualquer coisa aqui.

Linha 1
Linha 2
Linha 3`
        }

        return templates[language] || `// Novo arquivo ${language}\n\n// Adicione seu código aqui...`
    }

    const handleRun = () => {
        if (activeFile?.language === 'html') {
            const blob = new Blob([editorContent], { type: 'text/html' })
            const url = URL.createObjectURL(blob)
            window.open(url, '_blank')
        } else {
            // Executar no terminal
            const command = getRunCommand(activeFile?.language || '')
            executeTerminalCommand(command)
        }
    }

    const getRunCommand = (language: string) => {
        const commands: { [key: string]: string } = {
            'javascript': 'node',
            'python': 'python',
            'java': 'java',
            'cpp': 'g++ -o output && ./output',
            'go': 'go run',
            'rust': 'cargo run',
            'php': 'php',
            'ruby': 'ruby',
            'bash': 'bash'
        }
        return commands[language] || 'echo "Linguagem não suportada para execução"'
    }

    const executeTerminalCommand = (command: string) => {
        setTerminalOutput(prev => [...prev, `$ ${command}`])
        setTerminalHistory(prev => [...prev, command])

        // Simular execução (em produção, seria integrado com backend)
        setTimeout(() => {
            setTerminalOutput(prev => [...prev, 'Comando executado com sucesso!'])
        }, 1000)
    }

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'fenix') => {
        setTheme(newTheme)
        saveUserPreferences()
    }

    const handleLayoutChange = (newLayout: 'split' | 'tabs' | 'grid') => {
        setLayout(newLayout)
        saveUserPreferences()
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
        if (!isFullscreen) {
            document.documentElement.requestFullscreen?.()
        } else {
            document.exitFullscreen?.()
        }
    }

    // Handlers para botões da barra de ferramentas
    const handleCopy = () => {
        if (selectedText) {
            navigator.clipboard.writeText(selectedText)
        } else if (editorContent) {
            navigator.clipboard.writeText(editorContent)
        }
    }

    const handleCut = () => {
        if (selectedText) {
            navigator.clipboard.writeText(selectedText)
            setEditorContent(editorContent.replace(selectedText, ''))
        }
    }

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setEditorContent(editorContent + text)
        } catch (err) {
            console.error('Erro ao colar:', err)
        }
    }

    const handleUndo = () => {
        // Implementar undo (seria necessário um histórico de estados)
        console.log('Undo')
    }

    const handleRedo = () => {
        // Implementar redo (seria necessário um histórico de estados)
        console.log('Redo')
    }

    const handleFind = () => {
        setIsFindOpen(!isFindOpen)
    }

    const handleReplace = () => {
        setIsFindOpen(true)
        // Focar no campo de substituição
    }

    const handleZoomIn = () => {
        setEditorSettings(prev => ({
            ...prev,
            fontSize: Math.min(prev.fontSize + 2, 24)
        }))
    }

    const handleZoomOut = () => {
        setEditorSettings(prev => ({
            ...prev,
            fontSize: Math.max(prev.fontSize - 2, 8)
        }))
    }

    const handleRotate = () => {
        // Implementar rotação do editor
        console.log('Rotacionar editor')
    }

    const handleGridToggle = () => {
        setLayout(layout === 'grid' ? 'split' : 'grid')
    }

    const handleSplitToggle = () => {
        setLayout(layout === 'split' ? 'tabs' : 'split')
    }

    const handleColumnsToggle = () => {
        setLayout(layout === 'tabs' ? 'split' : 'tabs')
    }

    const handleRowsToggle = () => {
        // Implementar layout em linhas
        console.log('Layout em linhas')
    }

    const handleSquareToggle = () => {
        // Implementar modo quadrado
        console.log('Modo quadrado')
    }

    const handleCircleToggle = () => {
        // Implementar modo circular
        console.log('Modo circular')
    }

    const handleTriangleToggle = () => {
        // Implementar modo triangular
        console.log('Modo triangular')
    }

    const handleStarToggle = () => {
        // Implementar modo estrela
        console.log('Modo estrela')
    }

    const handleHeartToggle = () => {
        // Implementar modo coração
        console.log('Modo coração')
    }

    const handleSmileToggle = () => {
        // Implementar modo sorriso
        console.log('Modo sorriso')
    }

    const handleFrownToggle = () => {
        // Implementar modo triste
        console.log('Modo triste')
    }

    const handleMehToggle = () => {
        // Implementar modo neutro
        console.log('Modo neutro')
    }

    const handleThumbsUpToggle = () => {
        // Implementar modo positivo
        console.log('Modo positivo')
    }

    const handleThumbsDownToggle = () => {
        // Implementar modo negativo
        console.log('Modo negativo')
    }

    const handleCheckToggle = () => {
        // Implementar modo verificação
        console.log('Modo verificação')
    }

    const handleXCircleToggle = () => {
        // Implementar modo erro
        console.log('Modo erro')
    }

    const handleAlertCircleToggle = () => {
        // Implementar modo alerta
        console.log('Modo alerta')
    }

    const handleInfoToggle = () => {
        // Implementar modo informação
        console.log('Modo informação')
    }

    const handleHelpCircleToggle = () => {
        // Implementar modo ajuda
        console.log('Modo ajuda')
    }

    const handleExternalLinkToggle = () => {
        // Implementar modo link externo
        console.log('Modo link externo')
    }

    const handleLinkToggle = () => {
        // Implementar modo link
        console.log('Modo link')
    }

    const handleUnlinkToggle = () => {
        // Implementar modo desvincular
        console.log('Modo desvincular')
    }

    const handleBookmarkToggle = () => {
        // Implementar modo marcador
        console.log('Modo marcador')
    }

    const handleTagToggle = () => {
        // Implementar modo tag
        console.log('Modo tag')
    }

    const handleTagsToggle = () => {
        // Implementar modo tags
        console.log('Modo tags')
    }

    const handleFilterToggle = () => {
        // Implementar modo filtro
        console.log('Modo filtro')
    }

    const handleSortAscToggle = () => {
        // Implementar ordenação crescente
        console.log('Ordenação crescente')
    }

    const handleSortDescToggle = () => {
        // Implementar ordenação decrescente
        console.log('Ordenação decrescente')
    }

    const handleMoveToggle = () => {
        // Implementar modo mover
        console.log('Modo mover')
    }

    const handleMove3DToggle = () => {
        // Implementar modo mover 3D
        console.log('Modo mover 3D')
    }

    const handleRotate3DToggle = () => {
        // Implementar modo rotacionar 3D
        console.log('Modo rotacionar 3D')
    }

    const handleScaleToggle = () => {
        // Implementar modo escala
        console.log('Modo escala')
    }

    const handleCropToggle = () => {
        // Implementar modo cortar
        console.log('Modo cortar')
    }

    const handleEraserToggle = () => {
        // Implementar modo apagar
        console.log('Modo apagar')
    }

    const handlePencilToggle = () => {
        // Implementar modo lápis
        console.log('Modo lápis')
    }

    const handlePenToggle = () => {
        // Implementar modo caneta
        console.log('Modo caneta')
    }

    const handleHighlighterToggle = () => {
        // Implementar modo marcador
        console.log('Modo marcador')
    }

    const handlePaintbrushToggle = () => {
        // Implementar modo pincel
        console.log('Modo pincel')
    }

    const handleDropletToggle = () => {
        // Implementar modo gota
        console.log('Modo gota')
    }

    const handleSparklesToggle = () => {
        // Implementar modo brilho
        console.log('Modo brilho')
    }

    const handleWand2Toggle = () => {
        // Implementar modo varinha
        console.log('Modo varinha')
    }

    const handleFlashlightToggle = () => {
        // Implementar modo lanterna
        console.log('Modo lanterna')
    }

    const handleLightbulbToggle = () => {
        // Implementar modo lâmpada
        console.log('Modo lâmpada')
    }

    const handleFlameToggle = () => {
        // Implementar modo chama
        console.log('Modo chama')
    }

    const handleSnowflakeToggle = () => {
        // Implementar modo floco de neve
        console.log('Modo floco de neve')
    }

    const handleCloudToggle = () => {
        // Implementar modo nuvem
        console.log('Modo nuvem')
    }

    const handleCloudRainToggle = () => {
        // Implementar modo chuva
        console.log('Modo chuva')
    }

    const handleCloudSnowToggle = () => {
        // Implementar modo neve
        console.log('Modo neve')
    }

    const handleCloudLightningToggle = () => {
        // Implementar modo raio
        console.log('Modo raio')
    }

    const handleSunriseToggle = () => {
        // Implementar modo nascer do sol
        console.log('Modo nascer do sol')
    }

    const handleSunsetToggle = () => {
        // Implementar modo pôr do sol
        console.log('Modo pôr do sol')
    }

    const handleCalendarToggle = () => {
        // Implementar modo calendário
        console.log('Modo calendário')
    }

    const handleClockToggle = () => {
        // Implementar modo relógio
        console.log('Modo relógio')
    }

    const handleTimerToggle = () => {
        // Implementar modo timer
        console.log('Modo timer')
    }

    const handleHourglassToggle = () => {
        // Implementar modo ampulheta
        console.log('Modo ampulheta')
    }

    const handleWatchToggle = () => {
        // Implementar modo relógio de pulso
        console.log('Modo relógio de pulso')
    }

    const handleAlarmClockToggle = () => {
        // Implementar modo despertador
        console.log('Modo despertador')
    }

    const handleBellToggle = () => {
        // Implementar modo sino
        console.log('Modo sino')
    }

    const handleVolumeXToggle = () => {
        // Implementar modo sem som
        console.log('Modo sem som')
    }

    const handleVolume1Toggle = () => {
        // Implementar modo volume baixo
        console.log('Modo volume baixo')
    }

    const handleVolume2Toggle = () => {
        // Implementar modo volume alto
        console.log('Modo volume alto')
    }

    const handleMicToggle = () => {
        // Implementar modo microfone
        console.log('Modo microfone')
    }

    const handleMicOffToggle = () => {
        // Implementar modo microfone desligado
        console.log('Modo microfone desligado')
    }

    const handleHeadphonesToggle = () => {
        // Implementar modo fones de ouvido
        console.log('Modo fones de ouvido')
    }

    const handleSpeakerToggle = () => {
        // Implementar modo alto-falante
        console.log('Modo alto-falante')
    }

    const handleRadioToggle = () => {
        // Implementar modo rádio
        console.log('Modo rádio')
    }

    const handleTvToggle = () => {
        // Implementar modo TV
        console.log('Modo TV')
    }

    const handleCameraToggle = () => {
        // Implementar modo câmera
        console.log('Modo câmera')
    }

    const handleVideoToggle = () => {
        // Implementar modo vídeo
        console.log('Modo vídeo')
    }

    const handleVideoOffToggle = () => {
        // Implementar modo vídeo desligado
        console.log('Modo vídeo desligado')
    }

    const handleImageToggle = () => {
        // Implementar modo imagem
        console.log('Modo imagem')
    }

    const handleImagesToggle = () => {
        // Implementar modo imagens
        console.log('Modo imagens')
    }

    const handleFileImageToggle = () => {
        // Implementar modo arquivo de imagem
        console.log('Modo arquivo de imagem')
    }

    const handleFileVideoToggle = () => {
        // Implementar modo arquivo de vídeo
        console.log('Modo arquivo de vídeo')
    }

    const handleFileAudioToggle = () => {
        // Implementar modo arquivo de áudio
        console.log('Modo arquivo de áudio')
    }

    const handleFileMusicToggle = () => {
        // Implementar modo arquivo de música
        console.log('Modo arquivo de música')
    }

    const handleFileTextToggle = () => {
        // Implementar modo arquivo de texto
        console.log('Modo arquivo de texto')
    }

    const handleFileCodeToggle = () => {
        // Implementar modo arquivo de código
        console.log('Modo arquivo de código')
    }

    const handleFileJsonToggle = () => {
        // Implementar modo arquivo JSON
        console.log('Modo arquivo JSON')
    }

    const handleFileToggle = () => {
        // Implementar modo arquivo
        console.log('Modo arquivo')
    }

    const handleFolderToggle = () => {
        // Implementar modo pasta
        console.log('Modo pasta')
    }

    const handleFolderOpenToggle = () => {
        // Implementar modo pasta aberta
        console.log('Modo pasta aberta')
    }

    const handleFolderPlusToggle = () => {
        // Implementar modo adicionar pasta
        console.log('Modo adicionar pasta')
    }

    const handleFolderMinusToggle = () => {
        // Implementar modo remover pasta
        console.log('Modo remover pasta')
    }

    const handleFolderXToggle = () => {
        // Implementar modo excluir pasta
        console.log('Modo excluir pasta')
    }

    const handleFolderCheckToggle = () => {
        // Implementar modo verificar pasta
        console.log('Modo verificar pasta')
    }

    const handleFolderEditToggle = () => {
        // Implementar modo editar pasta
        console.log('Modo editar pasta')
    }

    const handleFolderLockToggle = () => {
        // Implementar modo bloquear pasta
        console.log('Modo bloquear pasta')
    }

    const handleArchiveToggle = () => {
        // Implementar modo arquivo
        console.log('Modo arquivo')
    }

    const handleArchiveRestoreToggle = () => {
        // Implementar modo restaurar arquivo
        console.log('Modo restaurar arquivo')
    }

    const handlePackageToggle = () => {
        // Implementar modo pacote
        console.log('Modo pacote')
    }

    const handlePackageOpenToggle = () => {
        // Implementar modo abrir pacote
        console.log('Modo abrir pacote')
    }

    const handlePackageCheckToggle = () => {
        // Implementar modo verificar pacote
        console.log('Modo verificar pacote')
    }

    const handlePackageXToggle = () => {
        // Implementar modo excluir pacote
        console.log('Modo excluir pacote')
    }

    const handlePackagePlusToggle = () => {
        // Implementar modo adicionar pacote
        console.log('Modo adicionar pacote')
    }

    const handlePackageMinusToggle = () => {
        // Implementar modo remover pacote
        console.log('Modo remover pacote')
    }

    const handleBoxToggle = () => {
        // Implementar modo caixa
        console.log('Modo caixa')
    }

    const handleBoxesToggle = () => {
        // Implementar modo caixas
        console.log('Modo caixas')
    }

    const handleContainerToggle = () => {
        // Implementar modo container
        console.log('Modo container')
    }

    const handleDatabaseToggle = () => {
        // Implementar modo banco de dados
        console.log('Modo banco de dados')
    }

    const handleServerToggle = () => {
        // Implementar modo servidor
        console.log('Modo servidor')
    }

    const handlePowerToggle = () => {
        // Implementar modo ligar
        console.log('Modo ligar')
    }

    const handlePowerOffToggle = () => {
        // Implementar modo desligar
        console.log('Modo desligar')
    }

    const handlePlugToggle = () => {
        // Implementar modo conectar
        console.log('Modo conectar')
    }

    const handleUnplugToggle = () => {
        // Implementar modo desconectar
        console.log('Modo desconectar')
    }

    const handleCableToggle = () => {
        // Implementar modo cabo
        console.log('Modo cabo')
    }

    const handleUsbToggle = () => {
        // Implementar modo USB
        console.log('Modo USB')
    }

    const handleBluetoothToggle = () => {
        // Implementar modo Bluetooth
        console.log('Modo Bluetooth')
    }

    const handleWifiOffToggle = () => {
        // Implementar modo WiFi desligado
        console.log('Modo WiFi desligado')
    }

    const handleSignalToggle = () => {
        // Implementar modo sinal
        console.log('Modo sinal')
    }

    const handleSignalZeroToggle = () => {
        // Implementar modo sem sinal
        console.log('Modo sem sinal')
    }

    const handleSignalLowToggle = () => {
        // Implementar modo sinal baixo
        console.log('Modo sinal baixo')
    }

    const handleSignalMediumToggle = () => {
        // Implementar modo sinal médio
        console.log('Modo sinal médio')
    }

    const handleSignalHighToggle = () => {
        // Implementar modo sinal alto
        console.log('Modo sinal alto')
    }

    const handleGlobeToggle = () => {
        // Implementar modo globo
        console.log('Modo globo')
    }

    const handleGlobe2Toggle = () => {
        // Implementar modo globo 2
        console.log('Modo globo 2')
    }

    const handleMapToggle = () => {
        // Implementar modo mapa
        console.log('Modo mapa')
    }

    const handleMapPinToggle = () => {
        // Implementar modo pin do mapa
        console.log('Modo pin do mapa')
    }

    const handleNavigationToggle = () => {
        // Implementar modo navegação
        console.log('Modo navegação')
    }

    const handleCompassToggle = () => {
        // Implementar modo bússola
        console.log('Modo bússola')
    }

    const handleTargetToggle = () => {
        // Implementar modo alvo
        console.log('Modo alvo')
    }

    const handleCrosshairToggle = () => {
        // Implementar modo mira
        console.log('Modo mira')
    }

    const handleFocusToggle = () => {
        // Implementar modo foco
        console.log('Modo foco')
    }

    const handleScanToggle = () => {
        // Implementar modo escaneamento
        console.log('Modo escaneamento')
    }

    const handleScanLineToggle = () => {
        // Implementar modo linha de escaneamento
        console.log('Modo linha de escaneamento')
    }

    const handleQrCodeToggle = () => {
        // Implementar modo QR Code
        console.log('Modo QR Code')
    }

    const handleBarcodeToggle = () => {
        // Implementar modo código de barras
        console.log('Modo código de barras')
    }

    const handleHashToggle = () => {
        // Implementar modo hash
        console.log('Modo hash')
    }

    const handleAtSignToggle = () => {
        // Implementar modo @
        console.log('Modo @')
    }

    const handlePercentToggle = () => {
        // Implementar modo percentual
        console.log('Modo percentual')
    }

    const handleDollarSignToggle = () => {
        // Implementar modo dólar
        console.log('Modo dólar')
    }

    const handleEuroToggle = () => {
        // Implementar modo euro
        console.log('Modo euro')
    }

    const handleCreditCardToggle = () => {
        // Implementar modo cartão de crédito
        console.log('Modo cartão de crédito')
    }

    const handleBanknoteToggle = () => {
        // Implementar modo cédula
        console.log('Modo cédula')
    }

    const handleCoinsToggle = () => {
        // Implementar modo moedas
        console.log('Modo moedas')
    }

    const handleWalletToggle = () => {
        // Implementar modo carteira
        console.log('Modo carteira')
    }

    const handleReceiptToggle = () => {
        // Implementar modo recibo
        console.log('Modo recibo')
    }

    const handleCalculatorToggle = () => {
        // Implementar modo calculadora
        console.log('Modo calculadora')
    }

    const handleRulerToggle = () => {
        // Implementar modo régua
        console.log('Modo régua')
    }

    const handleCompassIconToggle = () => {
        // Implementar modo bússola
        console.log('Modo bússola')
    }

    const handleTriangleIconToggle = () => {
        // Implementar modo triângulo
        console.log('Modo triângulo')
    }

    const handleSquareIconToggle = () => {
        // Implementar modo quadrado
        console.log('Modo quadrado')
    }

    const handleCircleIconToggle = () => {
        // Implementar modo círculo
        console.log('Modo círculo')
    }

    const handlePentagonToggle = () => {
        // Implementar modo pentágono
        console.log('Modo pentágono')
    }

    const handleOctagonToggle = () => {
        // Implementar modo octógono
        console.log('Modo octógono')
    }

    const handleDiamondToggle = () => {
        // Implementar modo diamante
        console.log('Modo diamante')
    }

    const handleArrowUpIconToggle = () => {
        // Implementar modo seta para cima
        console.log('Modo seta para cima')
    }

    const handleArrowDownIconToggle = () => {
        // Implementar modo seta para baixo
        console.log('Modo seta para baixo')
    }

    const handleArrowLeftIconToggle = () => {
        // Implementar modo seta para esquerda
        console.log('Modo seta para esquerda')
    }

    const handleArrowRightIconToggle = () => {
        // Implementar modo seta para direita
        console.log('Modo seta para direita')
    }

    const handleArrowUpLeftToggle = () => {
        // Implementar modo seta para cima-esquerda
        console.log('Modo seta para cima-esquerda')
    }

    const handleArrowUpRightToggle = () => {
        // Implementar modo seta para cima-direita
        console.log('Modo seta para cima-direita')
    }

    const handleArrowDownLeftToggle = () => {
        // Implementar modo seta para baixo-esquerda
        console.log('Modo seta para baixo-esquerda')
    }

    const handleArrowDownRightToggle = () => {
        // Implementar modo seta para baixo-direita
        console.log('Modo seta para baixo-direita')
    }

    const handleArrowUpDownToggle = () => {
        // Implementar modo seta para cima-baixo
        console.log('Modo seta para cima-baixo')
    }

    const handleArrowLeftRightToggle = () => {
        // Implementar modo seta para esquerda-direita
        console.log('Modo seta para esquerda-direita')
    }

    const handleArrowUpCircleToggle = () => {
        // Implementar modo seta para cima em círculo
        console.log('Modo seta para cima em círculo')
    }

    const handleArrowDownCircleToggle = () => {
        // Implementar modo seta para baixo em círculo
        console.log('Modo seta para baixo em círculo')
    }

    const handleArrowLeftCircleToggle = () => {
        // Implementar modo seta para esquerda em círculo
        console.log('Modo seta para esquerda em círculo')
    }

    const handleArrowRightCircleToggle = () => {
        // Implementar modo seta para direita em círculo
        console.log('Modo seta para direita em círculo')
    }

    const handleArrowUpSquareToggle = () => {
        // Implementar modo seta para cima em quadrado
        console.log('Modo seta para cima em quadrado')
    }

    const handleArrowDownSquareToggle = () => {
        // Implementar modo seta para baixo em quadrado
        console.log('Modo seta para baixo em quadrado')
    }

    const handleArrowLeftSquareToggle = () => {
        // Implementar modo seta para esquerda em quadrado
        console.log('Modo seta para esquerda em quadrado')
    }

    const handleArrowRightSquareToggle = () => {
        // Implementar modo seta para direita em quadrado
        console.log('Modo seta para direita em quadrado')
    }

    // Renderização
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-white">Carregando Fênix IDE...</h2>
                    <p className="text-purple-200 mt-2">Preparando sua experiência de desenvolvimento</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${theme === 'dark' ? 'bg-gray-900' : theme === 'light' ? 'bg-gray-50' : 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'}`}>
            {/* Header */}
            <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : theme === 'light' ? 'bg-white border-gray-200' : 'bg-black/20 backdrop-blur-sm border-purple-500/30'} border-b px-4 py-2 flex items-center justify-between`}>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Code2 className="h-6 w-6 text-purple-400" />
                        <span className="font-bold text-white">Fênix IDE</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsCommandPaletteOpen(true)}
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded flex items-center space-x-1"
                        >
                            <Search className="h-4 w-4" />
                            <span>Comandos</span>
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    {/* Botões de edição */}
                    <div className="flex items-center space-x-1 border-r border-gray-600 pr-2">
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-gray-600 text-white rounded"
                            title="Copiar"
                        >
                            <Copy className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleCut}
                            className="p-2 hover:bg-gray-600 text-white rounded"
                            title="Cortar"
                        >
                            <Scissors className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handlePaste}
                            className="p-2 hover:bg-gray-600 text-white rounded"
                            title="Colar"
                        >
                            <Clipboard className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleUndo}
                            className="p-2 hover:bg-gray-600 text-white rounded"
                            title="Desfazer"
                        >
                            <Undo className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleRedo}
                            className="p-2 hover:bg-gray-600 text-white rounded"
                            title="Refazer"
                        >
                            <Redo className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Botões de busca e substituição */}
                    <div className="flex items-center space-x-1 border-r border-gray-600 pr-2">
                        <button
                            onClick={handleFind}
                            className="p-2 hover:bg-gray-600 text-white rounded"
                            title="Buscar"
                        >
                            <SearchIcon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleReplace}
                            className="p-2 hover:bg-gray-600 text-white rounded"
                            title="Substituir"
                        >
                            <Replace className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Botões de zoom */}
                    <div className="flex items-center space-x-1 border-r border-gray-600 pr-2">
                        <button
                            onClick={handleZoomOut}
                            className="p-2 hover:bg-gray-600 text-white rounded"
                            title="Diminuir zoom"
                        >
                            <ZoomOut className="h-4 w-4" />
                        </button>
                        <span className="text-white text-sm px-2">{editorSettings.fontSize}px</span>
                        <button
                            onClick={handleZoomIn}
                            className="p-2 hover:bg-gray-600 text-white rounded"
                            title="Aumentar zoom"
                        >
                            <ZoomIn className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Botões de layout */}
                    <div className="flex items-center space-x-1 border-r border-gray-600 pr-2">
                        <button
                            onClick={handleGridToggle}
                            className={`p-2 hover:bg-gray-600 text-white rounded ${layout === 'grid' ? 'bg-purple-600' : ''}`}
                            title="Layout em grade"
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleSplitToggle}
                            className={`p-2 hover:bg-gray-600 text-white rounded ${layout === 'split' ? 'bg-purple-600' : ''}`}
                            title="Layout dividido"
                        >
                            <Split className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleColumnsToggle}
                            className={`p-2 hover:bg-gray-600 text-white rounded ${layout === 'tabs' ? 'bg-purple-600' : ''}`}
                            title="Layout em abas"
                        >
                            <Columns className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Botões principais */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded flex items-center space-x-1"
                        >
                            <Save className="h-4 w-4" />
                            <span>Salvar</span>
                        </button>

                        <button
                            onClick={handleRun}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded flex items-center space-x-1"
                        >
                            <Play className="h-4 w-4" />
                            <span>Executar</span>
                        </button>

                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded flex items-center space-x-1"
                        >
                            <Settings className="h-4 w-4" />
                            <span>Configurações</span>
                        </button>

                        <button
                            onClick={toggleFullscreen}
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded"
                        >
                            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Layout Principal */}
            <div className="flex h-screen">
                {/* Activity Bar */}
                <ActivityBar
                    isFileExplorerOpen={isFileExplorerOpen}
                    isTerminalOpen={isTerminalOpen}
                    isPreviewOpen={isPreviewOpen}
                    onFileExplorerToggle={() => setIsFileExplorerOpen(!isFileExplorerOpen)}
                    onTerminalToggle={() => setIsTerminalOpen(!isTerminalOpen)}
                    onPreviewToggle={() => setIsPreviewOpen(!isPreviewOpen)}
                    theme={theme}
                />

                {/* File Explorer */}
                {isFileExplorerOpen && (
                    <FileExplorer
                        project={currentProject}
                        activeFile={activeFile}
                        onFileSelect={handleFileSelect}
                        onCreateFile={handleCreateFile}
                        theme={theme}
                    />
                )}

                {/* Editor Area */}
                <div className="flex-1 flex flex-col">
                    {/* Tab Manager */}
                    <TabManager
                        files={currentProject?.files || []}
                        activeFile={activeFile}
                        onFileSelect={handleFileSelect}
                        onFileClose={(file) => {
                            // Implementar fechamento de arquivo
                        }}
                        theme={theme}
                    />

                    {/* Editor */}
                    <div className="flex-1 flex">
                        <div className="flex-1">
                            <MonacoEditor
                                value={editorContent}
                                language={activeFile?.language || 'javascript'}
                                onChange={handleContentChange}
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: true },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    wordWrap: 'on',
                                    folding: true,
                                    bracketPairColorization: { enabled: true },
                                    guides: {
                                        bracketPairs: true,
                                        indentation: true
                                    }
                                }}
                            />
                        </div>

                        {/* Preview Panel */}
                        {isPreviewOpen && (
                            <div className="w-1/2 border-l border-gray-700">
                                <PreviewPanel
                                    content={previewContent}
                                    type={previewType}
                                    theme={theme}
                                />
                            </div>
                        )}
                    </div>

                    {/* Terminal */}
                    {isTerminalOpen && (
                        <div className="h-64 border-t border-gray-700">
                            <TerminalPanel
                                history={terminalHistory}
                                output={terminalOutput}
                                onCommand={executeTerminalCommand}
                                theme={theme}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <StatusBar
                activeFile={activeFile}
                cursorPosition={cursorPosition}
                theme={theme}
                language={activeFile?.language || 'javascript'}
            />

            {/* Command Palette */}
            {isCommandPaletteOpen && (
                <CommandPalette
                    onClose={() => setIsCommandPaletteOpen(false)}
                    onCommand={(command) => {
                        // Implementar execução de comandos
                        setIsCommandPaletteOpen(false)
                    }}
                    theme={theme}
                />
            )}

            {/* Painel de Configurações */}
            {isSettingsOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-11/12 max-w-4xl h-5/6 overflow-hidden">
                        <div className="flex h-full">
                            {/* Sidebar de configurações */}
                            <div className="w-64 bg-gray-100 dark:bg-gray-700 border-r border-gray-300 dark:border-gray-600">
                                <div className="p-4 border-b border-gray-300 dark:border-gray-600">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Configurações</h2>
                                </div>
                                <nav className="p-2">
                                    <button
                                        onClick={() => setActiveSettingsTab('editor')}
                                        className={`w-full text-left px-3 py-2 rounded-md mb-1 ${activeSettingsTab === 'editor'
                                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        Editor
                                    </button>
                                    <button
                                        onClick={() => setActiveSettingsTab('theme')}
                                        className={`w-full text-left px-3 py-2 rounded-md mb-1 ${activeSettingsTab === 'theme'
                                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        Tema
                                    </button>
                                    <button
                                        onClick={() => setActiveSettingsTab('layout')}
                                        className={`w-full text-left px-3 py-2 rounded-md mb-1 ${activeSettingsTab === 'layout'
                                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        Layout
                                    </button>
                                    <button
                                        onClick={() => setActiveSettingsTab('keyboard')}
                                        className={`w-full text-left px-3 py-2 rounded-md mb-1 ${activeSettingsTab === 'keyboard'
                                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        Teclado
                                    </button>
                                    <button
                                        onClick={() => setActiveSettingsTab('extensions')}
                                        className={`w-full text-left px-3 py-2 rounded-md mb-1 ${activeSettingsTab === 'extensions'
                                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        Extensões
                                    </button>
                                </nav>
                            </div>

                            {/* Conteúdo das configurações */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="p-6">
                                    {activeSettingsTab === 'editor' && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Configurações do Editor</h3>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Tamanho da fonte
                                                    </label>
                                                    <input
                                                        type="range"
                                                        min="8"
                                                        max="24"
                                                        value={editorSettings.fontSize}
                                                        onChange={(e) => setEditorSettings(prev => ({
                                                            ...prev,
                                                            fontSize: parseInt(e.target.value)
                                                        }))}
                                                        className="w-full"
                                                    />
                                                    <span className="text-sm text-gray-500">{editorSettings.fontSize}px</span>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Família da fonte
                                                    </label>
                                                    <select
                                                        value={editorSettings.fontFamily}
                                                        onChange={(e) => setEditorSettings(prev => ({
                                                            ...prev,
                                                            fontFamily: e.target.value
                                                        }))}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                    >
                                                        <option value="Fira Code, Consolas, Monaco, monospace">Fira Code</option>
                                                        <option value="Consolas, Monaco, monospace">Consolas</option>
                                                        <option value="Monaco, monospace">Monaco</option>
                                                        <option value="Courier New, monospace">Courier New</option>
                                                        <option value="Arial, sans-serif">Arial</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Tamanho da tabulação
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="2"
                                                        max="8"
                                                        value={editorSettings.tabSize}
                                                        onChange={(e) => setEditorSettings(prev => ({
                                                            ...prev,
                                                            tabSize: parseInt(e.target.value)
                                                        }))}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Quebra de linha
                                                    </label>
                                                    <select
                                                        value={editorSettings.wordWrap}
                                                        onChange={(e) => setEditorSettings(prev => ({
                                                            ...prev,
                                                            wordWrap: e.target.value as any
                                                        }))}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                    >
                                                        <option value="off">Desabilitado</option>
                                                        <option value="on">Habilitado</option>
                                                        <option value="wordWrapColumn">Por coluna</option>
                                                        <option value="bounded">Limitado</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Recursos</h4>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={editorSettings.minimap}
                                                            onChange={(e) => setEditorSettings(prev => ({
                                                                ...prev,
                                                                minimap: e.target.checked
                                                            }))}
                                                            className="mr-2"
                                                        />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Minimap</span>
                                                    </label>

                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={editorSettings.bracketPairColorization}
                                                            onChange={(e) => setEditorSettings(prev => ({
                                                                ...prev,
                                                                bracketPairColorization: e.target.checked
                                                            }))}
                                                            className="mr-2"
                                                        />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Colorização de parênteses</span>
                                                    </label>

                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={editorSettings.autoClosingBrackets}
                                                            onChange={(e) => setEditorSettings(prev => ({
                                                                ...prev,
                                                                autoClosingBrackets: e.target.checked
                                                            }))}
                                                            className="mr-2"
                                                        />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Fechamento automático de parênteses</span>
                                                    </label>

                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={editorSettings.autoClosingQuotes}
                                                            onChange={(e) => setEditorSettings(prev => ({
                                                                ...prev,
                                                                autoClosingQuotes: e.target.checked
                                                            }))}
                                                            className="mr-2"
                                                        />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Fechamento automático de aspas</span>
                                                    </label>

                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={editorSettings.autoIndent}
                                                            onChange={(e) => setEditorSettings(prev => ({
                                                                ...prev,
                                                                autoIndent: e.target.checked
                                                            }))}
                                                            className="mr-2"
                                                        />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Indentação automática</span>
                                                    </label>

                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={editorSettings.formatOnSave}
                                                            onChange={(e) => setEditorSettings(prev => ({
                                                                ...prev,
                                                                formatOnSave: e.target.checked
                                                            }))}
                                                            className="mr-2"
                                                        />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Formatar ao salvar</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeSettingsTab === 'theme' && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Configurações de Tema</h3>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Tema
                                                </label>
                                                <div className="grid grid-cols-3 gap-4">
                                                    {['light', 'dark', 'fenix'].map((themeOption) => (
                                                        <button
                                                            key={themeOption}
                                                            onClick={() => handleThemeChange(themeOption as any)}
                                                            className={`p-4 rounded-lg border-2 ${theme === themeOption
                                                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                                                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                                                }`}
                                                        >
                                                            <div className={`w-full h-8 rounded ${themeOption === 'light' ? 'bg-gray-100' :
                                                                themeOption === 'dark' ? 'bg-gray-800' :
                                                                    'bg-gradient-to-r from-purple-600 to-blue-600'
                                                                }`}></div>
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 capitalize">
                                                                {themeOption}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Cores personalizadas
                                                </label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {Object.entries(themeSettings.colors).map(([key, value]) => (
                                                        <div key={key}>
                                                            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1 capitalize">
                                                                {key}
                                                            </label>
                                                            <input
                                                                type="color"
                                                                value={value}
                                                                onChange={(e) => setThemeSettings(prev => ({
                                                                    ...prev,
                                                                    colors: {
                                                                        ...prev.colors,
                                                                        [key]: e.target.value
                                                                    }
                                                                }))}
                                                                className="w-full h-10 rounded border border-gray-300 dark:border-gray-600"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeSettingsTab === 'layout' && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Configurações de Layout</h3>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Tipo de layout
                                                </label>
                                                <div className="grid grid-cols-3 gap-4">
                                                    {['split', 'tabs', 'grid'].map((layoutOption) => (
                                                        <button
                                                            key={layoutOption}
                                                            onClick={() => handleLayoutChange(layoutOption as any)}
                                                            className={`p-4 rounded-lg border-2 ${layout === layoutOption
                                                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                                                                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                                                }`}
                                                        >
                                                            <div className="w-full h-8 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                                {layoutOption === 'split' && <Split className="h-4 w-4" />}
                                                                {layoutOption === 'tabs' && <Columns className="h-4 w-4" />}
                                                                {layoutOption === 'grid' && <Grid3X3 className="h-4 w-4" />}
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 capitalize">
                                                                {layoutOption}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Painéis</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {Object.entries(layoutSettings.panels).map(([key, value]) => (
                                                        <label key={key} className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={value}
                                                                onChange={(e) => setLayoutSettings(prev => ({
                                                                    ...prev,
                                                                    panels: {
                                                                        ...prev.panels,
                                                                        [key]: e.target.checked
                                                                    }
                                                                }))}
                                                                className="mr-2"
                                                            />
                                                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeSettingsTab === 'keyboard' && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Atalhos de Teclado</h3>

                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Salvar</span>
                                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl+S</kbd>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Executar</span>
                                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">F5</kbd>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Buscar</span>
                                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl+F</kbd>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Substituir</span>
                                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl+H</kbd>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Copiar</span>
                                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl+C</kbd>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Colar</span>
                                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl+V</kbd>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Desfazer</span>
                                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl+Z</kbd>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">Refazer</span>
                                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl+Y</kbd>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeSettingsTab === 'extensions' && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Extensões</h3>

                                            <div className="text-center py-12">
                                                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    Sistema de extensões em desenvolvimento
                                                </p>
                                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                                    Em breve você poderá instalar e gerenciar extensões
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-300 dark:border-gray-600 px-6 py-4 flex justify-between items-center">
                            <button
                                onClick={() => setIsSettingsOpen(false)}
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center space-x-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Voltar</span>
                            </button>
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setIsSettingsOpen(false)}
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        saveUserPreferences()
                                        setIsSettingsOpen(false)
                                    }}
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}





