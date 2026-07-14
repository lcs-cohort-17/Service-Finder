// ===========================
// Lutfeeya - MAP-001 //
// ===========================

// src/components/Layout/Layout.tsx
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  footer,
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${className}`}>
      {/* Header */}
      {header && (
        <header className="bg-white shadow-md sticky top-0 z-50">
          {header}
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-4">
        {children}
      </main>

      {/* Footer */}
      {footer && (
        <footer className="bg-white border-t border-gray-200">
          {footer}
        </footer>
      )}
    </div>
  );
};

export default Layout;
// ===========================
// Lutfeeya - MAP-001 //
// ===========================
