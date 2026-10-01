/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MainTab, Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { FavoritesModal } from './components/common/FavoritesModal';
import { ResourceDetailModal } from './components/resources/ResourceDetailModal';
import { A4WorksheetPromptModal } from './components/tools/A4WorksheetPromptModal';

// Views
import { Dashboard } from './components/dashboard/Dashboard';
import { LandingPage } from './components/landing/LandingPage';
import { ResourcesCatalog } from './components/resources/ResourcesCatalog';
import { ToolsHub } from './components/tools/ToolsHub';
import { WorksheetGenerator } from './components/tools/WorksheetGenerator';
import { StoryboardGenerator } from './components/tools/StoryboardGenerator';
import { VideoGenerator } from './components/tools/VideoGenerator';
import { SongGenerator } from './components/tools/SongGenerator';
import { LKPDGenerator } from './components/tools/LKPDGenerator';
import { GameComicFlashcardGenerator } from './components/tools/GameComicFlashcardGenerator';
import { VideoAudioHub } from './components/video-audio/VideoAudioHub';
import { PromptLibrary } from './components/prompts/PromptLibrary';
import { AIDirectory } from './components/directory/AIDirectory';

// Data
import { mockEducationalResources } from './data/mockResources';
import { mockPromptLibrary } from './data/mockPrompts';
import { mockAIToolsDirectory } from './data/mockAITools';
import { EducationalResource, ToastMessage, WorksheetPromptCategoryType } from './types';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<MainTab>('dashboard');
  const [currentSubcategory, setCurrentSubcategory] = useState<string | undefined>(undefined);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedResource, setSelectedResource] = useState<EducationalResource | null>(null);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isA4PromptModalOpen, setIsA4PromptModalOpen] = useState(false);
  const [a4InitialCategory, setA4InitialCategory] = useState<WorksheetPromptCategoryType>('coding');

  const handleOpenA4PromptModal = (cat?: WorksheetPromptCategoryType) => {
    if (cat) {
      setA4InitialCategory(cat);
    }
    setIsA4PromptModalOpen(true);
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent Favorites & Saved Items in LocalStorage
  const [favoritePromptIds, setFavoritePromptIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('edusmart_fav_prompts');
      return saved ? JSON.parse(saved) : ['pr-ws-01', 'pr-storyboard-01', 'pr-audio-01'];
    } catch {
      return ['pr-ws-01', 'pr-storyboard-01', 'pr-audio-01'];
    }
  });

  const [favoriteToolIds, setFavoriteToolIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('edusmart_fav_tools');
      return saved ? JSON.parse(saved) : ['tool-text-01', 'tool-img-01', 'tool-aud-01'];
    } catch {
      return ['tool-text-01', 'tool-img-01', 'tool-aud-01'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('edusmart_fav_prompts', JSON.stringify(favoritePromptIds));
    } catch {
      // ignore storage full
    }
  }, [favoritePromptIds]);

  useEffect(() => {
    try {
      localStorage.setItem('edusmart_fav_tools', JSON.stringify(favoriteToolIds));
    } catch {
      // ignore
    }
  }, [favoriteToolIds]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Favorites Handlers
  const toggleFavoritePrompt = (id: string) => {
    setFavoritePromptIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Prompt dihapus dari favorit.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Prompt ditambahkan ke favorit!', 'success');
        return [...prev, id];
      }
    });
  };

  const toggleFavoriteTool = (id: string) => {
    setFavoriteToolIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Tool AI dihapus dari favorit.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Tool AI ditambahkan ke favorit!', 'success');
        return [...prev, id];
      }
    });
  };

  const handleCopyPromptText = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Teks berhasil disalin ke clipboard!', 'success');
  };

  // Navigation Router
  const handleNavigate = (tab: MainTab, subcat?: string) => {
    setCurrentTab(tab);
    setCurrentSubcategory(subcat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Toast Overlay */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Resource Detail Modal */}
      <ResourceDetailModal
        resource={selectedResource}
        isOpen={Boolean(selectedResource)}
        onClose={() => setSelectedResource(null)}
        onCopyPrompt={handleCopyPromptText}
      />

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favoritePrompts={mockPromptLibrary.filter((p) => favoritePromptIds.includes(p.id))}
        favoriteTools={mockAIToolsDirectory.filter((t) => favoriteToolIds.includes(t.id))}
        onRemovePromptFav={toggleFavoritePrompt}
        onRemoveToolFav={toggleFavoriteTool}
        onCopyPrompt={handleCopyPromptText}
      />

      {/* A4 Worksheet Text-to-Image Prompt Studio Modal */}
      <A4WorksheetPromptModal
        isOpen={isA4PromptModalOpen}
        onClose={() => setIsA4PromptModalOpen(false)}
        onCopyPrompt={handleCopyPromptText}
        onNotify={showToast}
        initialCategory={a4InitialCategory}
      />

      {/* Sidebar (Desktop and Mobile) */}
      <Sidebar
        currentTab={currentTab}
        currentSubcategory={currentSubcategory}
        onNavigate={handleNavigate}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Navbar */}
        <Navbar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          currentTab={currentTab}
          currentSubcategory={currentSubcategory}
          onNavigate={handleNavigate}
          favoritesCount={favoritePromptIds.length + favoriteToolIds.length}
          onOpenFavorites={() => setIsFavoritesModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Dynamic Page Router */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {/* Dashboard View */}
          {currentTab === 'dashboard' && (
            <Dashboard
              onNavigate={handleNavigate}
              resources={mockEducationalResources}
              prompts={mockPromptLibrary}
              onSelectResource={setSelectedResource}
              onCopyPrompt={handleCopyPromptText}
              onToggleFavoritePrompt={toggleFavoritePrompt}
              favoritePromptIds={favoritePromptIds}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenA4PromptStudio={() => handleOpenA4PromptModal('coding')}
            />
          )}

          {/* Landing / Overview Page */}
          {currentTab === 'landing' && (
            <LandingPage onNavigate={handleNavigate} />
          )}

          {/* Materi Edukasi Catalog */}
          {currentTab === 'resources' && (
            <ResourcesCatalog
              resources={mockEducationalResources}
              activeSubcategory={currentSubcategory}
              onSelectResource={setSelectedResource}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}

          {/* Tools AI Edukasi Hub & Specific Generators */}
          {currentTab === 'tools' && (
            <>
              {!currentSubcategory && (
                <ToolsHub
                  onSelectTool={(toolId) => handleNavigate('tools', toolId)}
                  onOpenA4PromptStudio={() => handleOpenA4PromptModal('coding')}
                />
              )}
              {currentSubcategory === 'tool-worksheet' && (
                <WorksheetGenerator
                  onBack={() => handleNavigate('tools')}
                  onSaveToSavedProjects={() => showToast('Disimpan ke proyek lokal!', 'success')}
                  onNotify={showToast}
                  onOpenA4PromptStudio={(cat) => handleOpenA4PromptModal(cat)}
                />
              )}
              {currentSubcategory === 'tool-coding-worksheet' && (
                <WorksheetGenerator
                  onBack={() => handleNavigate('tools')}
                  onSaveToSavedProjects={() => showToast('Disimpan ke proyek lokal!', 'success')}
                  onNotify={showToast}
                  onOpenA4PromptStudio={(cat) => handleOpenA4PromptModal(cat)}
                  initialCategoryId="coding"
                />
              )}
              {currentSubcategory === 'tool-storyboard' && (
                <StoryboardGenerator
                  onBack={() => handleNavigate('tools')}
                  onSaveProject={() => showToast('Storyboard tersimpan di profil!', 'success')}
                  onNotify={showToast}
                />
              )}
              {currentSubcategory === 'tool-video' && (
                <VideoGenerator
                  onBack={() => handleNavigate('tools')}
                  onNotify={showToast}
                />
              )}
              {currentSubcategory === 'tool-song' && (
                <SongGenerator
                  onBack={() => handleNavigate('tools')}
                  onSaveSong={() => showToast('Lagu tersimpan di profil!', 'success')}
                  onNotify={showToast}
                />
              )}
              {currentSubcategory === 'tool-lkpd' && (
                <LKPDGenerator
                  onBack={() => handleNavigate('tools')}
                  onSaveLKPD={() => showToast('LKPD tersimpan di profil!', 'success')}
                  onNotify={showToast}
                />
              )}
              {currentSubcategory === 'tool-game' && (
                <GameComicFlashcardGenerator
                  toolType="game"
                  onBack={() => handleNavigate('tools')}
                  onNotify={showToast}
                />
              )}
              {currentSubcategory === 'tool-comic' && (
                <GameComicFlashcardGenerator
                  toolType="comic"
                  onBack={() => handleNavigate('tools')}
                  onNotify={showToast}
                />
              )}
              {currentSubcategory === 'tool-flashcard' && (
                <GameComicFlashcardGenerator
                  toolType="flashcard"
                  onBack={() => handleNavigate('tools')}
                  onNotify={showToast}
                />
              )}
            </>
          )}

          {/* Video & Audio Hub */}
          {currentTab === 'video-audio' && (
            <VideoAudioHub
              activeSubcategory={currentSubcategory}
              onNavigate={handleNavigate}
              onNotify={showToast}
            />
          )}

          {/* Prompt Library */}
          {currentTab === 'prompts' && (
            <PromptLibrary
              prompts={mockPromptLibrary}
              activeSubcategory={currentSubcategory}
              favoritePromptIds={favoritePromptIds}
              onToggleFavorite={toggleFavoritePrompt}
              onCopyPrompt={handleCopyPromptText}
              onNotify={showToast}
              onOpenA4PromptStudio={() => handleOpenA4PromptModal('coding')}
            />
          )}

          {/* AI Tools Directory */}
          {currentTab === 'directory' && (
            <AIDirectory
              tools={mockAIToolsDirectory}
              activeSubcategory={currentSubcategory}
              favoriteToolIds={favoriteToolIds}
              onToggleFavorite={toggleFavoriteTool}
              onNotify={showToast}
            />
          )}
        </main>

        {/* Reusable Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
