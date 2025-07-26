import { useEffect, useState } from 'react';

export default function LegalDocs({ onClose }) {
  const [privacy, setPrivacy] = useState('');
  const [terms, setTerms] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const resPrivacy = await fetch('/api/legal/privacy');
        const dataPrivacy = await resPrivacy.json();

        const resTerms = await fetch('/api/legal/terms');
        const dataTerms = await resTerms.json();

        setPrivacy(dataPrivacy.content);
        setTerms(dataTerms.content);
      } catch (err) {
        console.error('Failed to load legal docs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Privacy Policy & Terms of Service</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Privacy Policy</h3>
              <div className="prose prose-sm max-w-none whitespace-pre-wrap">{privacy}</div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">Terms of Service</h3>
              <div className="prose prose-sm max-w-none whitespace-pre-wrap">{terms}</div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
