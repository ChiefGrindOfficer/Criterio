import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Moon, Sun, Mail, MessageCircle, FileText } from 'lucide-react';
import { AnimatedPattern } from './components/AnimatedPattern'; 

const logoLight = "/Criterio-logo-whitetheme.png";
const logoDark = "/Criterio-logo-darktheme.png";
const ogPreview = "/og-preview.png";

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Update favicon based on theme
    const faviconUrl = theme === 'light' ? logoLight : logoDark;
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
    favicon.type = 'image/png';
    favicon.rel = 'icon';
    favicon.href = faviconUrl;
    if (!document.querySelector("link[rel*='icon']")) {
      document.head.appendChild(favicon);
    }
  }, [theme]);

  useEffect(() => {
    // Update Open Graph meta tags for social media previews
    const url = window.location.href;
    
    const metaTags = [
      { property: 'og:title', content: 'Criterio — Web3 Business Consulting' },
      { property: 'og:description', content: 'Still deploying the site — already deploying results.' },
      { property: 'og:image', content: ogPreview },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Criterio — Web3 Business Consulting' },
      { name: 'twitter:description', content: 'Still deploying the site — already deploying results.' },
      { name: 'twitter:image', content: ogPreview },
    ];

    metaTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) meta.setAttribute('property', property);
        if (name) meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '160px 160px'
        }}
      />
      
      {/* Logo in top left corner */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-center">
        <img 
          src={theme === 'light' ? logoLight : logoDark} 
          alt="Criterio" 
          className="h-8 w-32 object-contain object-left"
        />
      </div>

      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </Button>
      </div>

      {/* Footer - Left */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3 opacity-60 text-sm md:text-base">
        <span>Criterio</span>
        <span className="opacity-60 hidden sm:inline">Web3 Business Consulting Agency</span>
      </div>

      {/* Footer - Right (Social Icons) */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-12 flex gap-3 md:gap-4 opacity-60">
        <button
          onClick={() => window.open('https://x.com/Criterio_io', '_blank')}
          className="hover:opacity-100 transition-all cursor-pointer p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="X (Twitter)"
        >
          <svg className="size-5 md:size-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 py-20 md:py-4">
        <div className="max-w-2xl w-full text-center space-y-8 md:space-y-12">
          {/* Message */}
          <div className="space-y-6 md:space-y-8">
            {/* Decorative Pattern */}
            <div className="flex justify-center mb-4 md:mb-6">
              <AnimatedPattern />
            </div>
            
            <p className="text-lg md:text-xl max-w-xl mx-auto opacity-90">
              Still deploying the site — already deploying results.
            </p>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = 'mailto:contact@criterio.io'}
                className="w-full sm:w-auto min-w-[180px] cursor-pointer font-normal"
              >
                <Mail className="size-5" />
                Send Email
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://t.me/DanilVC', '_blank')}
                className="w-full sm:w-auto min-w-[180px] cursor-pointer"
              >
                <MessageCircle className="size-5" />
                Quick Chat
              </Button>
              


              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://criteriopresentation.vercel.app/', '_blank')}
                className="w-full sm:w-auto min-w-[180px] cursor-pointer"
              >
                <FileText className="size-5" />
                Presentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
