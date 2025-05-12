import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAnnonces from '../../hooks/useAnnonces';

const DeleteAnnonce = () => {
  const { id } = useParams(); 
const { deleteAnnonce , error } = useAnnonces(); // Assuming you have a deleteAnnonce function in your hook  

const id_annonce = Number(id);

const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    navigate(-1); // navigate back on cancel
  };

  const handleDelete = async () => {
    try {
      await deleteAnnonce(id_annonce); // Call the delete function from your hook
      console.log(id_annonce);

if(!error) {
    
    toast.success('Annonce deleted successfully!');
        setShow(false);
        navigate('/app/profile/posts'); // redirect after successful deletion
    
        
      } else {
        toast.error('Failed to delete annonce.');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
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
                  <p>Are you sure you want to delete this annonce?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    No, go back
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleDelete}>
                    Yes, delete it
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default DeleteAnnonce;