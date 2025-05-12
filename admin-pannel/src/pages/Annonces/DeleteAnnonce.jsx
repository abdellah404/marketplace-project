import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AnnoncesService from '../../services/AnnoncesService';

const DeleteAnnonce = () => {
  const { id } = useParams();
  const id_annonce = Number(id);
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    navigate(-1); // navigate back on cancel
  };

  const handleDelete = async () => {
    try {
      const response = await AnnoncesService.deleteAnnonce(id_annonce);
      // Consider both 200 and 204 as success responses.
      if (response?.status === 200 || response?.status === 204) {
        toast.success('Annonce deleted successfully!');
        setShow(false);
        navigate(-1); // redirect after successful deletion
      } else {
        toast.error('Failed to delete annonce.');
      }
    } catch (err) {
      console.error('Error during deletion:', err);
      setError(err);
      toast.error('Failed to delete annonce.');
    }
  };

  return (
    <>
      {show && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Annonce</h5>
                  <button type="button" className="btn-close" onClick={handleClose}></button>
                </div>
                <div className="modal-body">

                  <p>Are you sure you want to disable this annonce? </p>

                  {error && (
                    <div className="alert alert-danger mt-2">
                      {error.message || 'An error occurred during deletion.'}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    No, go back
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    Yes, disable it
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal Backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default DeleteAnnonce;