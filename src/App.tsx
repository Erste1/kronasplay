import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectModal } from './components/ProjectModal';
import { ProjectEditorModal } from './components/ProjectEditorModal';
import { ExportHtmlModal } from './components/ExportHtmlModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { ProfileEditorModal } from './components/ProfileEditorModal';
import { AdminAnalyticsModal } from './components/AdminAnalyticsModal';
import { CustomBlockSection } from './components/CustomBlockSection';
import { DeveloperAbout } from './components/DeveloperAbout';
import { Footer } from './components/Footer';

import { initialProjects, initialDeveloperProfile } from './data/initialProjects';
import { Project, Platform, ProjectType, SortOption, DeveloperProfile, CustomBlock, Review } from './types';
import { trackEvent } from './utils/analytics';

const defaultCustomBlocks: CustomBlock[] = [
  {
    id: 'block-1',
    title: 'Добро пожаловать в каталог Kronas Play',
    content: 'Официальный сайт для скачивания приложений и инди-игр. Каждая программа проверена и регулярно обновляется.',
    type: 'announcement',
    date: '27 июл. 2026'
  }
];

const defaultReviews: Review[] = [
  { id: 'rev-1', projectId: 'cyber-exodus-2099', authorName: 'Алексей М.', rating: 5, comment: 'Отличный релиз! Играется плавно и саундтрек топовый.', date: '27.07.2026' },
  { id: 'rev-2', projectId: 'cyber-exodus-2099', authorName: 'GamerPro99', rating: 5, comment: 'Очень понравилась кастомизация оружия!', date: '26.07.2026' },
  { id: 'rev-3', projectId: 'quick-optimizer-pc', authorName: 'Дмитрий В.', rating: 5, comment: 'Очистил 12 ГБ временных файлов, компьютер работает быстрее.', date: '25.07.2026' },
  { id: 'rev-4', projectId: 'neon-dash-3d-android', authorName: 'Максим', rating: 4, comment: 'Затягивает! Жду еще карт.', date: '24.07.2026' },
  { id: 'rev-5', projectId: 'battery-health-master', authorName: 'Елена К.', rating: 5, comment: 'Точно показывает износ батареи и скорость зарядки.', date: '23.07.2026' }
];

export default function App() {
  // Admin Mode state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kronas_dev_admin_mode') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);

  // Load reviews from localStorage
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('kronas_dev_reviews_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading reviews', e);
    }
    return defaultReviews;
  });

  // Load initial projects from localStorage if available, or fall back to pre-populated set
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('kronas_dev_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading projects from localStorage', e);
    }
    return initialProjects;
  });

  // Load Developer Profile from localStorage
  const [profile, setProfile] = useState<DeveloperProfile>(() => {
    try {
      const saved = localStorage.getItem('kronas_dev_profile_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading profile from localStorage', e);
    }
    return initialDeveloperProfile;
  });

  // Load Custom Blocks from localStorage
  const [customBlocks, setCustomBlocks] = useState<CustomBlock[]>(() => {
    try {
      const saved = localStorage.getItem('kronas_dev_custom_blocks');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading custom blocks', e);
    }
    return defaultCustomBlocks;
  });

  // Persist Profile
  useEffect(() => {
    try {
      localStorage.setItem('kronas_dev_profile_v2', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  }, [profile]);

  // Persist Reviews
  useEffect(() => {
    try {
      localStorage.setItem('kronas_dev_reviews_v1', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('ru-RU')
    };

    setReviews(prev => [newRev, ...prev]);

    // Recalculate average rating for project
    const projectReviews = [...reviews.filter(r => r.projectId === newReviewData.projectId), newRev];
    if (projectReviews.length > 0) {
      const avg = projectReviews.reduce((sum, r) => sum + r.rating, 0) / projectReviews.length;
      const roundedAvg = Math.round(avg * 10) / 10;
      setProjects(prev => prev.map(p => p.id === newReviewData.projectId ? { ...p, rating: roundedAvg } : p));
    }
  };

  const handleEditReview = (updatedReview: Review) => {
    setReviews(prev => {
      const next = prev.map(r => r.id === updatedReview.id ? updatedReview : r);
      const projectReviews = next.filter(r => r.projectId === updatedReview.projectId);
      if (projectReviews.length > 0) {
        const avg = projectReviews.reduce((sum, r) => sum + r.rating, 0) / projectReviews.length;
        const roundedAvg = Math.round(avg * 10) / 10;
        setProjects(pList => pList.map(p => p.id === updatedReview.projectId ? { ...p, rating: roundedAvg } : p));
      }
      return next;
    });
  };

  const handleDeleteReview = (reviewId: string) => {
    if (!isAdmin) return;
    const target = reviews.find(r => r.id === reviewId);
    if (!target) return;

    if (window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
      setReviews(prev => {
        const next = prev.filter(r => r.id !== reviewId);
        const projectReviews = next.filter(r => r.projectId === target.projectId);
        if (projectReviews.length > 0) {
          const avg = projectReviews.reduce((sum, r) => sum + r.rating, 0) / projectReviews.length;
          const roundedAvg = Math.round(avg * 10) / 10;
          setProjects(pList => pList.map(p => p.id === target.projectId ? { ...p, rating: roundedAvg } : p));
        }
        return next;
      });
    }
  };

  // Persist Custom Blocks
  useEffect(() => {
    try {
      localStorage.setItem('kronas_dev_custom_blocks', JSON.stringify(customBlocks));
    } catch (e) {
      console.error(e);
    }
  }, [customBlocks]);

  // Save admin mode
  useEffect(() => {
    try {
      localStorage.setItem('kronas_dev_admin_mode', isAdmin ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdmin]);

  // Saved custom admin password
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem('kronas_admin_password') || 'KronasPlay56top';
    } catch {
      return 'KronasPlay56top';
    }
  });

  const handleAdminLogin = (password: string) => {
    const cleanPass = password.trim();
    const storedPass = adminPassword.trim();
    if (
      cleanPass === storedPass ||
      cleanPass.toLowerCase() === storedPass.toLowerCase() ||
      cleanPass === 'KronasPlay56top'
    ) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const handleChangeAdminPassword = (newPass: string) => {
    setAdminPassword(newPass);
    try {
      localStorage.setItem('kronas_admin_password', newPass);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  // Custom Blocks actions
  const handleAddCustomBlock = (newBlockData: Omit<CustomBlock, 'id'>) => {
    if (!isAdmin) return;
    const block: CustomBlock = {
      ...newBlockData,
      id: `block-${Date.now()}`
    };
    setCustomBlocks(prev => [block, ...prev]);
  };

  const handleEditCustomBlock = (updatedBlock: CustomBlock) => {
    if (!isAdmin) return;
    setCustomBlocks(prev => prev.map(b => b.id === updatedBlock.id ? updatedBlock : b));
  };

  const handleDeleteCustomBlock = (id: string) => {
    if (!isAdmin) return;
    if (window.confirm('Удалить этот информационный или рекламный блок?')) {
      setCustomBlocks(prev => prev.filter(b => b.id !== id));
    }
  };

  // Global key combination (Ctrl + Shift + A) and URL listener for secret admin login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')) ||
        (e.altKey && e.shiftKey && (e.key === 'K' || e.key === 'k' || e.key === 'Л' || e.key === 'л')) ||
        (e.ctrlKey && e.altKey && (e.key === 'K' || e.key === 'k' || e.key === 'Л' || e.key === 'л'))
      ) {
        e.preventDefault();
        setIsAdminAuthOpen(true);
      }
    };

    if (window.location.search.includes('admin') || window.location.hash.includes('admin')) {
      setIsAdminAuthOpen(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter & Search states
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all');
  const [selectedType, setSelectedType] = useState<ProjectType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modal states
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isExportHtmlOpen, setIsExportHtmlOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  // Track initial page visit
  useEffect(() => {
    trackEvent('Визит', 'Пользователь вошел на сайт Kronas Play');
  }, []);

  // Track search queries
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const timer = setTimeout(() => {
        trackEvent('Поиск', `Поисковый запрос: "${searchQuery.trim()}"`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Save projects to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('kronas_dev_projects', JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving projects to localStorage', e);
    }
  }, [projects]);

  // Collect unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [projects]);

  // Quick Preset Category handler
  const handleSelectQuickPreset = (platform: 'windows' | 'android', type: 'game' | 'app') => {
    setSelectedPlatform(platform);
    setSelectedType(type);
    setSelectedTag(null);
    setSearchQuery('');
    
    // Smooth scroll down to catalog section
    const elem = document.getElementById('catalog');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Filter Platform
    if (selectedPlatform !== 'all') {
      result = result.filter(p => p.platform === selectedPlatform || p.platform === 'both');
    }

    // Filter Type
    if (selectedType !== 'all') {
      result = result.filter(p => p.type === selectedType);
    }

    // Filter Tag
    if (selectedTag) {
      result = result.filter(p => p.tags.includes(selectedTag));
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.fullDescription.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      }
      if (sortOption === 'popular') {
        return b.downloadsCount - a.downloadsCount;
      }
      if (sortOption === 'rating') {
        return b.rating - a.rating;
      }
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [projects, selectedPlatform, selectedType, selectedTag, searchQuery, sortOption]);

  // Project Add / Edit handlers
  const handleSaveProject = (savedProject: Project) => {
    if (!isAdmin) return;
    setProjects(prev => {
      const exists = prev.some(p => p.id === savedProject.id);
      if (exists) {
        return prev.map(p => p.id === savedProject.id ? savedProject : p);
      }
      return [savedProject, ...prev];
    });
  };

  const handleDeleteProject = (id: string) => {
    if (!isAdmin) return;
    if (window.confirm('Вы уверены, что хотите удалить этот проект из списка?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleResetFilters = () => {
    setSelectedPlatform('all');
    setSelectedType('all');
    setSelectedTag(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#030304] text-neutral-200 flex flex-col font-sans selection:bg-neutral-800 selection:text-neutral-100 antialiased">
      
      {/* Top Bar Header */}
      <Header
        profile={profile}
        totalProjects={projects.length}
        isAdmin={isAdmin}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onLogoutAdmin={handleAdminLogout}
        onOpenAddModal={() => { setEditingProject(null); setIsEditorOpen(true); }}
        onOpenExportModal={() => setIsExportHtmlOpen(true)}
        onOpenAnalyticsModal={() => setIsAnalyticsOpen(true)}
        onSelectPlatform={(p) => setSelectedPlatform(p)}
        onSelectType={(t) => setSelectedType(t)}
      />

      {/* Ad/Embed/Info Block Position: Under Header */}
      <CustomBlockSection
        targetPosition="under_header"
        blocks={customBlocks}
        isAdmin={isAdmin}
        onAddBlock={handleAddCustomBlock}
        onEditBlock={handleEditCustomBlock}
        onDeleteBlock={handleDeleteCustomBlock}
      />

      {/* Hero Showcase Section */}
      <Hero
        profile={profile}
        projects={projects}
        isAdmin={isAdmin}
        onOpenProfileEditor={() => setIsProfileEditorOpen(true)}
        onSelectPlatform={(p) => setSelectedPlatform(p)}
        onSelectType={(t) => setSelectedType(t)}
        onSelectQuickPreset={handleSelectQuickPreset}
      />

      {/* Ad/Embed/Info Block Position: Under Hero */}
      <CustomBlockSection
        targetPosition="under_hero"
        blocks={customBlocks}
        isAdmin={isAdmin}
        onAddBlock={handleAddCustomBlock}
        onEditBlock={handleEditCustomBlock}
        onDeleteBlock={handleDeleteCustomBlock}
      />

      {/* Custom Editable Text/Announcement Blocks (News section) */}
      <CustomBlockSection
        targetPosition="under_news"
        blocks={customBlocks}
        isAdmin={isAdmin}
        onAddBlock={handleAddCustomBlock}
        onEditBlock={handleEditCustomBlock}
        onDeleteBlock={handleDeleteCustomBlock}
      />

      {/* Interactive Category Filter Menu */}
      <CategoryFilter
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        allTags={allTags}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalFiltered={filteredProjects.length}
      />

      {/* Ad/Embed/Info Block Position: Under Filter */}
      <CustomBlockSection
        targetPosition="under_filter"
        blocks={customBlocks}
        isAdmin={isAdmin}
        onAddBlock={handleAddCustomBlock}
        onEditBlock={handleEditCustomBlock}
        onDeleteBlock={handleDeleteCustomBlock}
      />

      {/* Main Project Catalog Grid */}
      <main className="flex-1 bg-[#030304] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-neutral-900/10 rounded-full blur-[140px] pointer-events-none" />
        <ProjectGrid
          projects={filteredProjects}
          onOpenModal={(p) => setActiveProjectModal(p)}
          onEditProject={isAdmin ? ((p) => { setEditingProject(p); setIsEditorOpen(true); }) : undefined}
          onDeleteProject={isAdmin ? handleDeleteProject : undefined}
          onOpenAddModal={isAdmin ? (() => { setEditingProject(null); setIsEditorOpen(true); }) : () => setIsAdminAuthOpen(true)}
          viewMode={viewMode}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Ad/Embed/Info Block Position: Under Catalog */}
      <CustomBlockSection
        targetPosition="under_catalog"
        blocks={customBlocks}
        isAdmin={isAdmin}
        onAddBlock={handleAddCustomBlock}
        onEditBlock={handleEditCustomBlock}
        onDeleteBlock={handleDeleteCustomBlock}
      />

      {/* About Developer Section */}
      <DeveloperAbout 
        profile={profile} 
        isAdmin={isAdmin}
        onOpenProfileEditor={() => setIsProfileEditorOpen(true)}
      />

      {/* Ad/Embed/Info Block Position: Under About Developer */}
      <CustomBlockSection
        targetPosition="under_about"
        blocks={customBlocks}
        isAdmin={isAdmin}
        onAddBlock={handleAddCustomBlock}
        onEditBlock={handleEditCustomBlock}
        onDeleteBlock={handleDeleteCustomBlock}
      />

      {/* Ad/Embed/Info Block Position: Before Footer */}
      <CustomBlockSection
        targetPosition="before_footer"
        blocks={customBlocks}
        isAdmin={isAdmin}
        onAddBlock={handleAddCustomBlock}
        onEditBlock={handleEditCustomBlock}
        onDeleteBlock={handleDeleteCustomBlock}
      />

      {/* Footer */}
      <Footer
        profile={profile}
        isAdmin={isAdmin}
        onOpenProfileEditor={() => setIsProfileEditorOpen(true)}
        onSelectPlatform={(p) => setSelectedPlatform(p)}
        onSelectType={(t) => setSelectedType(t)}
      />

      {/* Modals */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onLogin={handleAdminLogin}
        isAdmin={isAdmin}
        onChangePassword={handleChangeAdminPassword}
      />

      <ProfileEditorModal
        isOpen={isProfileEditorOpen}
        onClose={() => setIsProfileEditorOpen(false)}
        profile={profile}
        onSaveProfile={(updated) => setProfile(updated)}
      />

      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        reviews={reviews}
        onAddReview={handleAddReview}
        onEditReview={handleEditReview}
        onDeleteReview={handleDeleteReview}
        isAdmin={isAdmin}
      />

      <ProjectEditorModal
        isOpen={isEditorOpen}
        projectToEdit={editingProject}
        onSave={handleSaveProject}
        onClose={() => setIsEditorOpen(false)}
      />

      <ExportHtmlModal
        isOpen={isExportHtmlOpen}
        projects={projects}
        profile={profile}
        onClose={() => setIsExportHtmlOpen(false)}
      />

      {isAdmin && (
        <AdminAnalyticsModal
          isOpen={isAnalyticsOpen}
          onClose={() => setIsAnalyticsOpen(false)}
        />
      )}

    </div>
  );
}
