import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon,X, Loader2, Mic, MicOff } from 'lucide-react';
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Define types for search results
type SearchResultItem = {
  id: string;
  url: string;
  title: string;
  type: 'community' | 'issue';
  category?: 'environment' | 'infrastructure' | 'safety' | 'education' | 'health';
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const GlobalSearch: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { performSearch, searchResults, isSearching, connectionStatus } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          performSearch(transcript);
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [performSearch]);

  // Handle keyboard shortcut to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Handle search when query changes
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      if (query) {
        performSearch(query);
      }
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [query, open, performSearch]);

  const toggleVoiceRecognition = () => {
    if (!recognitionRef.current) {
      console.error('Speech recognition not supported');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSelect = (item: SearchResultItem) => {
    setOpen(false);
    setQuery('');
    navigate(item.url);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">{t('Search')}</span>
        <span className="sr-only">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="relative">
          <CommandInput
            ref={inputRef}
            placeholder={connectionStatus === 'offline' ? 
              `${t('Search')} (offline mode)` : 
              `${t('Search')} ${t('communities')}, ${t('issues')}`
            }
            value={query}
            onValueChange={setQuery}
            className="pr-14"
          />
          
          <div className="absolute right-0.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
 
            
            {/* Microphone button with listening state */}
            <button
              type="button"
              onClick={toggleVoiceRecognition}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                isListening && "text-red-500"
              )}
              aria-label={isListening ? "Stop listening" : "Start voice search"}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>
          </div>
          
          {/* Listening indicator appears only when active */}
          {isListening && (
            <div className="absolute right-16 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs text-muted-foreground">Listening...</span>
            </div>
          )}
        </div>
        
        <CommandList>
          {isSearching ? (
            <div className="p-4 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Searching...</p>
            </div>
          ) : query.length > 0 && searchResults.length === 0 ? (
            <CommandEmpty>No results found</CommandEmpty>
          ) : (
            <>
              {searchResults.length > 0 && (
                <>
                  <CommandGroup heading={t('Communities')}>
                    {(searchResults as SearchResultItem[])
                      .filter(item => item.type === 'community')
                      .map(item => (
                        <CommandItem 
                          key={item.id}
                          value={item.title}
                          onSelect={() => handleSelect(item)}
                        >
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                            <span className="text-xs text-primary">
                              {item.title.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span>{item.title}</span>
                        </CommandItem>
                      ))
                    }
                  </CommandGroup>
                  
                  <CommandGroup heading={t('Issues')}>
                    {(searchResults as SearchResultItem[])
                      .filter(item => item.type === 'issue')
                      .map(item => (
                        <CommandItem 
                          key={item.id}
                          value={item.title}
                          onSelect={() => handleSelect(item)}
                        >
                          <div 
                            className={cn(
                              "mr-2 w-2 h-2 rounded-full",
                              item.category === 'environment' && "bg-green-500",
                              item.category === 'infrastructure' && "bg-orange-500",
                              item.category === 'safety' && "bg-red-500",
                              item.category === 'education' && "bg-blue-500",
                              item.category === 'health' && "bg-purple-500"
                            )}
                          />
                          <span>{item.title}</span>
                        </CommandItem>
                      ))
                    }
                  </CommandGroup>
                </>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default GlobalSearch;