import { useState, useEffect, useRef, useCallback } from 'react';
import { apiFetch } from '../services/api';
import type { ConnectorResponseDto, InitiateConnectionResponseDto } from '../services/api';

interface ConnectorsManagerProps {
  addToast: (type: 'success' | 'assistant' | 'warning' | 'error', title: string, message: string) => void;
}

interface ProviderMeta {
  key: 'trello' | 'notion' | 'github';
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

export default function ConnectorsManager({ addToast }: ConnectorsManagerProps) {
  const [connectors, setConnectors] = useState<ConnectorResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // provider key or connection id

  // Keep track of active polls to clear them on unmount
  const activePollsRef = useRef<{ [connectionId: string]: number }>({});

  // Polls the status of an initiated connection
  const startPolling = useCallback((connectionId: string, provider: 'trello' | 'notion' | 'github') => {
    if (activePollsRef.current[connectionId]) return;

    setActionLoading(provider);

    const intervalId = window.setInterval(async () => {
      try {
        const conn = await apiFetch<ConnectorResponseDto>(`/connectors/${connectionId}`);
        if (conn.status === 'active') {
          clearInterval(intervalId);
          delete activePollsRef.current[connectionId];
          setActionLoading(null);
          addToast('success', 'Connexion établie !', `Votre compte ${provider.toUpperCase()} est désormais connecté.`);
          // Refresh list of connectors
          const data = await apiFetch<ConnectorResponseDto[]>('/connectors');
          setConnectors(data);
        } else if (conn.status === 'failed' || conn.status === 'revoked') {
          clearInterval(intervalId);
          delete activePollsRef.current[connectionId];
          setActionLoading(null);
          addToast('error', 'Échec de connexion', `La liaison avec ${provider.toUpperCase()} a échoué.`);
          // Refresh list of connectors
          const data = await apiFetch<ConnectorResponseDto[]>('/connectors');
          setConnectors(data);
        }
      } catch (err) {
        console.error('Polling error:', err);
        clearInterval(intervalId);
        delete activePollsRef.current[connectionId];
        setActionLoading(null);
      }
    }, 2500);

    activePollsRef.current[connectionId] = intervalId;
  }, [addToast]);

  const fetchConnectors = useCallback(async () => {
    try {
      const data = await apiFetch<ConnectorResponseDto[]>('/connectors');
      setConnectors(data);

      // Check if any connectors are in the 'initiated' state on load, and start polling for them
      data.forEach((c) => {
        if (c.status === 'initiated') {
          startPolling(c.id, c.provider);
        }
      });
    } catch (err) {
      console.error('Error fetching connectors:', err);
      addToast('error', 'Erreur de chargement', 'Impossible de récupérer vos intégrations.');
    } finally {
      setIsLoading(false);
    }
  }, [addToast, startPolling]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchConnectors();
    const activePolls = activePollsRef.current;
    return () => {
      // Clear all active polls on unmount using cloned reference to avoid changed ref warning
      Object.values(activePolls).forEach((intervalId) => clearInterval(intervalId));
    };
  }, [fetchConnectors]);

  const handleConnect = async (provider: 'trello' | 'notion' | 'github') => {
    setActionLoading(provider);
    try {
      // Start the connection flow
      const res = await apiFetch<InitiateConnectionResponseDto>(`/connectors/${provider}/connect`, {
        method: 'POST',
      });

      // Open the OAuth authorization page in a new window/tab
      window.open(res.redirect_url, '_blank');
      addToast(
        'assistant',
        'Autorisation requise',
        `Veuillez autoriser l'accès sur la page ${provider.toUpperCase()} qui vient de s'ouvrir.`
      );

      // Start polling for active state
      startPolling(res.connection_id, provider);
      
      // Refresh the connectors list immediately to display the "initiated" state
      fetchConnectors();
    } catch (err: unknown) {
      console.error('Connect error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Impossible de lancer la liaison.';
      addToast('error', 'Erreur de connexion', errorMsg);
      setActionLoading(null);
    }
  };

  const handleDisconnect = async (id: string, provider: string) => {
    if (!confirm(`Voulez-vous vraiment déconnecter votre compte ${provider.toUpperCase()} ?`)) {
      return;
    }

    setActionLoading(id);
    try {
      await apiFetch<void>(`/connectors/${id}`, {
        method: 'DELETE',
      });
      addToast('success', 'Compte déconnecté', `L'intégration ${provider.toUpperCase()} a été supprimée.`);
      fetchConnectors();
    } catch (err: unknown) {
      console.error('Disconnect error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Impossible de révoquer la liaison.';
      addToast('error', 'Erreur de déconnexion', errorMsg);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelConnection = async (id: string, provider: string) => {
    // 1. Clear poll interval immediately
    if (activePollsRef.current[id]) {
      clearInterval(activePollsRef.current[id]);
      delete activePollsRef.current[id];
    }
    
    setActionLoading(provider);

    try {
      // 2. Call delete connection endpoint on backend
      await apiFetch<void>(`/connectors/${id}`, {
        method: 'DELETE',
      });
      addToast('success', 'Liaison annulée', `La tentative d'association avec ${provider.toUpperCase()} a été annulée.`);
      fetchConnectors();
    } catch (err: unknown) {
      console.error('Cancel connection error:', err);
      // Fallback: sync local states regardless of API errors
      fetchConnectors();
    } finally {
      setActionLoading(null);
    }
  };

  const providerMetas: ProviderMeta[] = [
    {
      key: 'notion',
      name: 'Notion',
      description: 'Importez des pages de notes, des bases de connaissances et des wikis académiques.',
      color: '#000000',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M4.148 3.407c-.437.037-.73.2-.876.49-.18.358-.163.856-.163 1.956v11.758c0 1.258-.02 1.77.108 2.083a1.4 1.4 0 0 0 .723.755c.348.163.957.18 2.76.18h9.85c1.472 0 1.97-.008 2.298-.106a1.442 1.442 0 0 0 .867-.803c.125-.3.111-.703.111-2.128V5.626c0-1.127.02-1.636-.098-1.947a1.43 1.43 0 0 0-.756-.76c-.328-.135-.863-.146-2.585-.146H5.06c-.459 0-.77.014-.912.034zm1.252 2.502h2.525c.328 0 .546.03.655.088.164.088.232.229.232.535 0 .285-.054.407-.202.536-.123.102-.287.12-.767.12H6.516v9.068l4.475-6.84c.264-.407.457-.61.642-.71.185-.098.468-.146.903-.146h3.29c.307 0 .504.02.614.075.163.088.239.24.239.516 0 .237-.061.373-.286.685l-3.928 5.753v.038l4.774 7.625h-2.913a.965.965 0 0 1-.689-.283l-3.98-6.195H9.68v6.478h1.632c.48 0 .644.018.766.12.149.129.203.251.203.536 0 .306-.068.447-.232.535-.109.058-.327.088-.655.088H5.4c-.328 0-.546-.03-.655-.088-.164-.088-.232-.229-.232-.535 0-.285.054-.407.202-.536.123-.102.287-.12.767-.12h1.196v-8.68H5.4c-.328 0-.546-.03-.655-.088-.164-.088-.232-.229-.232-.535 0-.285.054-.407.202-.536.123-.102.287-.12.767-.12z" />
        </svg>
      ),
    },
    {
      key: 'trello',
      name: 'Trello',
      description: 'Lisez des cartes de tâches, des sujets de recherche et des tableaux Kanban.',
      color: '#0079BF',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M19.43 3H4.57C3.7 3 3 3.7 3 4.57v14.86C3 20.3 3.7 21 4.57 21h14.86c.87 0 1.57-.7 1.57-1.57V4.57C21 3.7 20.3 3 19.43 3zM10.15 14.57c0 .87-.7 1.57-1.57 1.57H5.71c-.87 0-1.57-.7-1.57-1.57V5.71c0-.87.7-1.57 1.57-1.57h2.86c.87 0 1.57.7 1.57 1.57v8.86zm9.57-5.71c0 .87-.7 1.57-1.57 1.57h-2.86c-.87 0-1.57-.7-1.57-1.57V5.71c0-.87.7-1.57 1.57-1.57h2.86c.87 0 1.57.7 1.57 1.57v3.15z" />
        </svg>
      ),
    },
    {
      key: 'github',
      name: 'GitHub',
      description: 'Connectez vos fichiers Markdown, documentations techniques et dépôts de code.',
      color: '#24292E',
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-[1000px] mx-auto p-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-[1.8rem] font-bold text-[#2F4858] font-brand tracking-tight">Centre de Contexte</h2>
        <p className="text-sm text-slate-500 font-sans leading-relaxed">
          Liez vos applications externes pour permettre au planificateur IA de collecter du contexte pertinent (sujets, tâches, documentation) sans jamais détenir vos identifiants.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#E5E9EB] rounded-2xl">
          <span className="w-10 h-10 border-4 border-slate-200 border-t-[#518B91] rounded-full animate-spin"></span>
          <p className="mt-4 font-sans text-sm text-slate-500 font-semibold">Récupération des connecteurs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {providerMetas.map((provider) => {
            // Find existing connection in list
            const connection = connectors.find((c) => c.provider === provider.key);
            const isConnLoading = actionLoading === provider.key || (connection && actionLoading === connection.id);

            return (
              <div
                key={provider.key}
                className="bg-white border border-[#E5E9EB] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3.5 rounded-xl text-white flex items-center justify-center"
                      style={{ backgroundColor: provider.color }}
                    >
                      {provider.icon}
                    </div>

                    {/* Status Badge */}
                    {connection ? (
                      <span
                        className={`px-3 py-1 rounded-full text-[0.72rem] font-bold tracking-wide uppercase ${
                          connection.status === 'active'
                            ? 'bg-[#EAF3DE] text-[#639922]'
                            : connection.status === 'initiated'
                            ? 'bg-[#FAEEDA] text-[#BA7517] animate-pulse'
                            : connection.status === 'failed'
                            ? 'bg-[#FCEBEB] text-[#E24B4A]'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {connection.status === 'active' && 'Connecté'}
                        {connection.status === 'initiated' && 'Liaison en cours...'}
                        {connection.status === 'failed' && 'Échoué'}
                        {connection.status === 'revoked' && 'Déconnecté'}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[0.72rem] font-bold bg-slate-100 text-slate-400 uppercase tracking-wide">
                        Non configuré
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#2F4858] font-brand mb-2">{provider.name}</h3>
                  <p className="text-[0.78rem] text-slate-500 leading-relaxed font-sans mb-6">
                    {provider.description}
                  </p>
                </div>

                <div>
                  {connection && connection.status === 'initiated' && (
                    <div className="mb-4 text-[0.7rem] text-[#BA7517] bg-[#FAEEDA] p-2 rounded-lg font-sans font-medium flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#BA7517] rounded-full animate-ping"></span>
                      <span>En attente de validation Composio...</span>
                    </div>
                  )}

                  {connection && connection.status === 'initiated' ? (
                    <div className="flex gap-2">
                      <div className="flex-1 bg-slate-100 border border-slate-200/80 text-slate-500 font-brand text-[0.8rem] font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 select-none">
                        <span className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                        Vérification...
                      </div>
                      <button
                        onClick={() => handleCancelConnection(connection.id, provider.key)}
                        className="bg-transparent border border-solid border-red-200 hover:bg-red-50 text-red-500 font-brand text-[0.82rem] font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all active:scale-[0.97]"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : connection && connection.status === 'active' ? (
                    <button
                      onClick={() => handleDisconnect(connection.id, provider.key)}
                      disabled={isConnLoading}
                      className="w-full bg-transparent border border-solid border-slate-200 text-red-500 font-brand text-[0.82rem] font-semibold py-2.5 rounded-xl cursor-pointer hover:bg-red-50/50 hover:border-red-200 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                      {isConnLoading ? (
                        <span className="w-4 h-4 border-2 border-red-500/25 border-t-red-500 rounded-full animate-spin"></span>
                      ) : (
                        'Déconnecter'
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleConnect(provider.key)}
                      disabled={isConnLoading}
                      className="w-full bg-[#2F4858] hover:bg-[#3E6976] text-white font-brand text-[0.82rem] font-bold py-2.5 rounded-xl border-none cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                      {isConnLoading ? (
                        <span className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        `Associer ${provider.name}`
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
