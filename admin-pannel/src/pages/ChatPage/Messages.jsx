import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { Link } from "react-router";

const Messages = () => {
  const { token } = useAuth();
  const [senders, setSenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch unique users who sent messages to the admin
    const fetchSenders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/chat/senders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSenders(response.data);
      } catch (error) {
        setSenders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSenders();
  }, [token]);

  // Delete all messages from a sender
  const handleDeleteMessages = async (senderId) => {
  if (!window.confirm("Supprimer tous les messages de cet utilisateur ?")) return;
  try {
    await axios.delete(
      `http://localhost:8000/api/chat/messages/${senderId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setSenders((prev) => prev.filter((user) => user.sender.id !== senderId));
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message &&
      error.response.data.message.includes("No query results for model")
    ) {
      alert("Aucun message à supprimer pour cet utilisateur.");
    } else {
      alert("Erreur lors de la suppression des messages.");
    }
  }
};

  if (loading) return <Loading />;

  return (
    <div className="container py-5" style={{ maxWidth: 700 }}>
      <div className="mb-5 text-center">
        <h2 className="fw-bold display-6 mb-1">Utilisateurs ayant envoyé un message</h2>
        <p className="text-muted mb-0">Gérez les conversations reçues via la messagerie.</p>
      </div>
      {senders.length > 0 ? (
        <ul className="list-group shadow-sm rounded-3">
          {senders.map((user) => (
            <li
              key={user.sender.id}
              className="list-group-item d-flex justify-content-between align-items-center py-3"
              style={{ border: "none", borderBottom: "1px solid #eee" }}
            >
              <div className="d-flex align-items-center">
                <img
                  src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-circle me-3 border"
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <div className="fw-semibold fs-5">{user.sender.name}</div>
                  <div className="text-muted small">{user.sender.email}</div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Link
                  to={`/admin/chat/${user.sender.id}`}
                  className="btn btn-sm btn-outline-primary rounded-pill px-3"
                >
                  Voir messages
                </Link>

                <button
            className="btn btn-sm btn-outline-danger rounded-pill px-3"
            onClick={() => handleDeleteMessages(user.sender.id)}
          >
            Supprimer
          </button>
              
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-info text-center mt-4">
          Aucun utilisateur n'a envoyé de message.
        </div>
      )}
    </div>
  );
};

export default Messages;