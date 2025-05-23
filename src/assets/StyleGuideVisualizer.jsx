import React, { useState } from 'react';
import { Palette, Type, Layout, Circle, Square, Hexagon, Moon, Sun } from 'lucide-react';

const StyleGuideVisualizer = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const colorPalette = [
    { name: 'Primary (Gold)', var: '--primary', description: 'Main brand color - golden hue' },
    { name: 'Secondary (Purple)', var: '--secondary', description: 'Secondary brand color' },
    { name: 'Accent (Violet)', var: '--accent', description: 'Accent highlights' },
    { name: 'Background', var: '--background', description: 'Page background' },
    { name: 'Foreground', var: '--foreground', description: 'Main text color' },
    { name: 'Card', var: '--card', description: 'Card backgrounds' },
    { name: 'Muted', var: '--muted', description: 'Subtle backgrounds' },
    { name: 'Border', var: '--border', description: 'Component borders' },
    { name: 'Destructive (Pink)', var: '--destructive', description: 'Error/danger states' },
  ];

  const chartColors = [
    { name: 'Chart 1 (Violet)', var: '--chart-1' },
    { name: 'Chart 2 (Gold)', var: '--chart-2' },
    { name: 'Chart 3 (Blue)', var: '--chart-3' },
    { name: 'Chart 4 (Pink)', var: '--chart-4' },
    { name: 'Chart 5 (Purple)', var: '--chart-5' },
  ];

  const radiusValues = [
    { name: 'Small', class: 'rounded-sm', value: 'calc(var(--radius) - 4px)' },
    { name: 'Medium', class: 'rounded-md', value: 'calc(var(--radius) - 2px)' },
    { name: 'Large', class: 'rounded-lg', value: 'var(--radius)' },
    { name: 'Extra Large', class: 'rounded-xl', value: 'calc(var(--radius) + 4px)' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        {/* Inline CSS for custom properties */}
        <style jsx>{`
          :root {
            --font-primary: 'Poppins', sans-serif;
            --font-secondary: 'Montserrat', sans-serif;
            --radius: 0.625rem;
            
            /* Light mode colors */
            --background: oklch(0.98 0.01 300);
            --foreground: oklch(0.2 0.05 280);
            --card: oklch(1 0 0);
            --card-foreground: oklch(0.2 0.05 280);
            --popover: oklch(1 0 0);
            --popover-foreground: oklch(0.2 0.05 280);
            --primary: oklch(0.8 0.15 85);
            --primary-foreground: oklch(0.1 0.02 280);
            --secondary: oklch(0.75 0.15 300);
            --secondary-foreground: oklch(1 0 0);
            --accent: oklch(0.65 0.2 280);
            --accent-foreground: oklch(1 0 0);
            --muted: oklch(0.95 0.03 280);
            --muted-foreground: oklch(0.5 0.1 280);
            --destructive: oklch(0.7 0.25 350);
            --border: oklch(0.9 0.05 280);
            --input: oklch(0.9 0.05 280);
            --ring: oklch(0.8 0.15 85);
            --chart-1: oklch(0.65 0.2 280);
            --chart-2: oklch(0.8 0.15 85);
            --chart-3: oklch(0.6 0.2 250);
            --chart-4: oklch(0.7 0.25 350);
            --chart-5: oklch(0.75 0.15 300);
          }
          
          .dark {
            --background: oklch(0.15 0.05 280);
            --foreground: oklch(0.95 0.02 300);
            --card: oklch(0.2 0.05 280);
            --card-foreground: oklch(0.95 0.02 300);
            --popover: oklch(0.2 0.05 280);
            --popover-foreground: oklch(0.95 0.02 300);
            --primary: oklch(0.75 0.12 85);
            --primary-foreground: oklch(0.1 0.02 280);
            --secondary: oklch(0.3 0.1 300);
            --secondary-foreground: oklch(0.95 0.02 300);
            --accent: oklch(0.4 0.15 280);
            --accent-foreground: oklch(0.95 0.02 300);
            --muted: oklch(0.25 0.05 280);
            --muted-foreground: oklch(0.7 0.1 280);
            --destructive: oklch(0.75 0.25 350);
            --border: oklch(0.3 0.1 280);
            --input: oklch(0.3 0.1 280);
            --ring: oklch(0.75 0.12 85);
            --chart-1: oklch(0.5 0.25 280);
            --chart-2: oklch(0.75 0.12 85);
            --chart-3: oklch(0.5 0.2 250);
            --chart-4: oklch(0.6 0.25 350);
            --chart-5: oklch(0.6 0.15 300);
          }
          
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
          }
          
          body {
            font-family: 'Poppins', sans-serif;
          }
        `}</style>

        {/* Header */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Design System Style Guide
                </h1>
                <p className="text-muted-foreground text-lg">
                  A comprehensive overview of your design system's colors, typography, and components
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
          {/* Color Palette */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Palette className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold">Color Palette</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {colorPalette.map((color) => (
                <div key={color.name} className="bg-card border border-border rounded-lg p-6">
                  <div 
                    className="w-full h-20 rounded-lg mb-4 border border-border"
                    style={{ backgroundColor: `var(${color.var})` }}
                  />
                  <h3 className="font-semibold text-lg mb-2">{color.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{color.description}</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{color.var}</code>
                </div>
              ))}
            </div>

            {/* Chart Colors */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-6">Chart Color Palette</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {chartColors.map((color) => (
                  <div key={color.name} className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-3 border border-border"
                      style={{ backgroundColor: `var(${color.var})` }}
                    />
                    <p className="text-sm font-medium">{color.name}</p>
                    <code className="text-xs text-muted-foreground">{color.var}</code>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Typography */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Type className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold">Typography</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-6">Font Families</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Primary Font (Poppins)</h4>
                    <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-lg">
                      The quick brown fox jumps over the lazy dog
                    </p>
                    <code className="text-xs text-muted-foreground">font-primary</code>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Secondary Font (Montserrat)</h4>
                    <p style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-lg font-semibold">
                      The quick brown fox jumps over the lazy dog
                    </p>
                    <code className="text-xs text-muted-foreground">font-secondary</code>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-6">Heading Styles</h3>
                <div className="space-y-4">
                  <h1 className="text-4xl">Heading 1</h1>
                  <h2 className="text-3xl">Heading 2</h2>
                  <h3 className="text-2xl">Heading 3</h3>
                  <h4 className="text-xl">Heading 4</h4>
                  <h5 className="text-lg">Heading 5</h5>
                  <h6 className="text-base">Heading 6</h6>
                </div>
              </div>
            </div>
          </section>

          {/* Border Radius */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Square className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold">Border Radius</h2>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {radiusValues.map((radius) => (
                  <div key={radius.name} className="text-center">
                    <div className={`w-20 h-20 bg-primary mx-auto mb-3 ${radius.class}`} />
                    <h4 className="font-medium">{radius.name}</h4>
                    <code className="text-xs text-muted-foreground block">{radius.class}</code>
                    <code className="text-xs text-muted-foreground">{radius.value}</code>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Component Examples */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Layout className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold">Component Examples</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Buttons */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-6">Buttons</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <button 
                      className="px-4 py-2 rounded-lg font-medium transition-colors"
                      style={{ 
                        backgroundColor: 'var(--primary)', 
                        color: 'var(--primary-foreground)' 
                      }}
                    >
                      Primary Button
                    </button>
                    <button 
                      className="px-4 py-2 rounded-lg font-medium transition-colors"
                      style={{ 
                        backgroundColor: 'var(--secondary)', 
                        color: 'var(--secondary-foreground)' 
                      }}
                    >
                      Secondary Button
                    </button>
                    <button 
                      className="px-4 py-2 rounded-lg font-medium border transition-colors"
                      style={{ 
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)'
                      }}
                    >
                      Outline Button
                    </button>
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-6">Cards</h3>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Muted Card</h4>
                    <p className="text-muted-foreground text-sm">This is a subtle card variant</p>
                  </div>
                  <div 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                  >
                    <h4 className="font-medium mb-2">Accent Card</h4>
                    <p className="text-sm opacity-90">This is an accent card variant</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Status Indicators */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Circle className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-semibold">Status & States</h2>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: 'var(--primary)' }} />
                  <p className="font-medium">Primary</p>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: 'var(--accent)' }} />
                  <p className="font-medium">Active</p>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: 'var(--destructive)' }} />
                  <p className="font-medium">Error</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StyleGuideVisualizer;