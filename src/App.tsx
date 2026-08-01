import { useState } from 'react';

import HomeView from '@/components/HomeView';

import MapView from '@/components/MapView';

import DirectoryView from '@/components/DirectoryView';

import GuideView from '@/components/GuideView';

import BottomNav, { type TabId } from '@/components/BottomNav';



export default function App() {

  // Inicia por defecto en 'inicio' para evitar problemas de renderizado del mapa en iOS

  const [tab, setTab] = useState<TabId>('inicio');



  return (

    <div className="fixed inset-0 bg-gray-50 text-navy-500 overflow-hidden">

      <div className="h-full w-full">

        {tab === 'inicio' && <HomeView onNavigate={(nextTab) => setTab(nextTab)} />}

        {tab === 'mapa' && <MapView />}

        {tab === 'directorio' && <DirectoryView />}

        {tab === 'guia' && <GuideView />}

      </div>

      <BottomNav active={tab} onChange={setTab} />

    </div>

  );

} 

