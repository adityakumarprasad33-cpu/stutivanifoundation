'use client';

import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SearchButton } from '../layout/search-button';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
// import { UnifiedSearchService } from '@/features/public/services/unified-search.service';

export function SearchOverlay() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<any>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (!query || query.length < 3) {
      setResults(null);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      // const res = await UnifiedSearchService.search(query);
      // setResults(res);
      setResults({
        programs: [],
        projects: [],
        blogs: [],
        events: [],
      }); // Mock results
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex items-center cursor-pointer hover:bg-muted p-2 rounded-md">
          <SearchButton />
          <span className="hidden text-sm text-muted-foreground ml-2 md:inline-flex border px-2 py-0.5 rounded-md">
            ⌘K
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden" showCloseButton={false}>
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="flex items-center border-b px-3">
          <SearchIcon className="mr-2 h-5 w-5 shrink-0 opacity-50" />
          <Input
            placeholder="Search programs, projects, blogs..."
            className="flex h-14 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {isLoading && <Loader2 className="ml-2 h-5 w-5 animate-spin opacity-50 shrink-0" />}
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-4 text-sm">
          {!query && (
            <p className="text-center text-muted-foreground p-4">Type to start searching...</p>
          )}
          {query && !isLoading && results && (
            <div className="space-y-6">
              {Object.entries(results).map(([type, items]: [string, any]) => {
                if (!items || items.length === 0) return null;
                return (
                  <div key={type} className="space-y-2">
                    <h3 className="font-semibold text-muted-foreground capitalize px-2">{type}</h3>
                    <ul className="space-y-1">
                      {items.map((item: any, i: number) => (
                        <li key={i} className="hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 cursor-pointer">
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
              {Object.values(results).every((arr: any) => arr.length === 0) && (
                <p className="text-center text-muted-foreground p-4">No results found for "{query}".</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
