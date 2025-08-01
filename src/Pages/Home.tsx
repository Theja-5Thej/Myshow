import { useState, useEffect, useRef, useCallback } from 'react';
import { TVShowForm } from '../Components/TVShowForm';
import { TVShowTable } from '../Components/TVShowTable'
import type { TVShow } from '../types/tvshow';
import { useAuth } from '../Context/AuthProvider';
import {  useNavigate } from 'react-router-dom';


import {
  fetchShows,
  createShow,
  updateShow,
  deleteShow,
} from '../Services/tvshow'; // assume these API methods exist

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Boolean>(false)
  const [shows, setShows] = useState<TVShow[]>([]);
  const [editingShow, setEditingShow] = useState<TVShow | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const LIMIT = 15;
  const offsetRef = useRef(0);
  const [triggerReload, setTriggerReload] = useState(false);
  const openForm = (show: TVShow | null = null) => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setEditingShow(show);
    setShowFormModal(true);
  };

  const closeForm = () => {
    setEditingShow(null);
    setShowFormModal(false);
  };

 const loadMore = async () => {
  if (loading || loadingMore || !hasMore) return;

  if (offsetRef.current === 0) setLoading(true);
  else setLoadingMore(true);

  try {
    const res = await fetchShows(LIMIT, offsetRef.current);
    const newShows = res.data;

    setShows(prev => [...prev, ...newShows]);
    offsetRef.current += newShows.length;

    if (!newShows.length || newShows.length < LIMIT) {
      setHasMore(false);
    }
  } catch (error) {
    console.error("Error loading more shows:", error);
  } finally {
    setLoading(false);
    setLoadingMore(false);
  }
};




  // Initial load
  useEffect(() => {
    loadMore();
  }, []);

  // Scroll listener
  const debounce = (fn: () => void, delay: number) => {
    let timeoutId: number;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(fn, delay);
    };
  };

  useEffect(() => {
    const container = document.getElementById('tvshow-table-container');
    if (!container) return;

    const onScroll = debounce(() => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      const bottom = scrollTop + clientHeight >= scrollHeight - 200;

      if (bottom) loadMore();
    }, 150);

    container.addEventListener('scroll', onScroll);

    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [loadMore]);




  const handleSave = async (data: Partial<TVShow>, posterUrl?: string) => {
  const finalData = { ...data, posterUrl };

  if (editingShow?.id) {
    await updateShow(editingShow.id, finalData);
  } else {
    await createShow(finalData as TVShow);
  }

  setEditingShow(null);

  offsetRef.current = 0;
  setHasMore(true);
  setShows([]);

  setTriggerReload(true); // trigger reload through effect
};

  useEffect(() => {
  if (triggerReload) {
    loadMore();
    setTriggerReload(false);
  }
}, [triggerReload, loadMore]);


  return (
    <div >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">TV Shows</h2>
        <button
          onClick={() => openForm()}
          className="bg-blue-100! text-blue-700 px-4 py-2 rounded-md shadow-md hover:bg-blue-200 transition-colors duration-200"
        >
          Add New Show
        </button>

      </div>

      <TVShowTable
        shows={shows}
        loading={loading}
        loadingMore={loadingMore}
        hasMore={hasMore}
        onEdit={(show) => openForm(show)}
        onDelete={async (id) => {
          const confirmed = window.confirm("Are you sure you want to delete this show?");
          if (!confirmed) return;

          await deleteShow(id);
          const res = await fetchShows();
          setShows(res.data);
        }}

      />

      {/* Custom Tailwind Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white w-full max-w-3xl p-0 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto">
            <h4 className="text-md font-semibold mb-4">
              {editingShow ? 'Edit TV Show' : 'Add TV Show'}
            </h4>

            <TVShowForm
              onSubmit={handleSave}
              closeModal={closeForm}
              initialData={editingShow || {}}
            />

            <button
              onClick={closeForm}
              className="absolute top-3 right-4 bg-white! border-0! text-gray-500 hover:text-red-500 text-4xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home