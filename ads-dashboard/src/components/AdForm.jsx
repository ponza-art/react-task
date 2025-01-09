import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAd, updateAd } from "../features/adsSlice";
import { useNavigate, Link } from "react-router-dom";

const AdForm = ({ existingAd }) => {
  // Convert date string to datetime-local format
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().slice(0, 16); // Format: "yyyy-MM-ddThh:mm"
  };

  // Convert datetime-local format back to API format
  const formatDateForAPI = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const [formData, setFormData] = useState({
    video: existingAd?.video || '',
    image: existingAd?.image || '',
    from_time: formatDateForInput(existingAd?.from_time) || '',
    to_time: formatDateForInput(existingAd?.to_time) || '',
  });
  const [mediaType, setMediaType] = useState(existingAd?.video ? 'video' : 'image');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a properly structured ad object
    const newAd = {
      id: existingAd?.id || Date.now(), // Use existing ID or generate new one
      ...formData,
      // Only include the active media type
      video: mediaType === 'video' ? formData.video : null,
      image: mediaType === 'image' ? formData.image : null,
      from_time: formatDateForAPI(formData.from_time),
      to_time: formatDateForAPI(formData.to_time),
    };

    if (existingAd) {
      // For updates, maintain the same ID and update the content
      dispatch(updateAd({ 
        id: existingAd.id, 
        updatedAd: {
          ...existingAd,
          ...newAd
        }
      }));
    } else {
      // For new ads, add to the existing list
      dispatch(addAd(newAd));
    }

    // Navigate back to the list view
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-black text-white shadow rounded">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Media Type</label>
        <select
          value={mediaType}
          onChange={(e) => {
            setMediaType(e.target.value);
            // Clear the other media type when switching
            setFormData(prev => ({
              ...prev,
              video: e.target.value === 'video' ? prev.video : '',
              image: e.target.value === 'image' ? prev.image : ''
            }));
          }}
          className="select select-bordered w-full"
        >
          <option value="video">Video</option>
          <option value="image">Image</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          {mediaType === 'video' ? 'Video URL' : 'Image URL'}
        </label>
        <input
          type="text"
          name={mediaType}
          value={formData[mediaType]}
          onChange={handleInputChange}
          className="input input-bordered w-full bg-gray-900 border-red-600 focus:border-red-400"
          placeholder={`Enter ${mediaType} URL`}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Start Time</label>
        <input
          type="datetime-local"
          name="from_time"
          value={formData.from_time}
          onChange={handleInputChange}
          className="input input-bordered w-full bg-gray-900 border-red-600 focus:border-red-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">End Time</label>
        <input
          type="datetime-local"
          name="to_time"
          value={formData.to_time}
          onChange={handleInputChange}
          className="input input-bordered w-full bg-gray-900 border-red-600 focus:border-red-400"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button type="submit" className="btn bg-red-600 hover:bg-red-700 text-white border-none flex-1">
          {existingAd ? 'Update' : 'Create'} Ad
        </button>
        <Link to="/" className="btn bg-black hover:bg-red-900 text-white border border-red-600 flex-1">
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default AdForm;
