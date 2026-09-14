import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [], onNavigateHome }) {
  const handleHomeClick = (e) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="my-3 sm:my-4">
      <ol 
        itemScope 
        itemType="https://schema.org/BreadcrumbList" 
        className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400"
      >
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem" 
          className="inline-flex items-center gap-1"
        >
          <a
            href="/"
            onClick={handleHomeClick}
            itemProp="item"
            className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span itemProp="name">Home</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 2;

          return (
            <li
              key={index}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="inline-flex items-center gap-1.5"
            >
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) item.onClick();
                  }}
                  itemProp="item"
                  className="text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors font-medium"
                >
                  <span itemProp="name">{item.label}</span>
                </a>
              ) : (
                <span
                  itemProp="name"
                  className="text-slate-900 dark:text-white font-semibold"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
