import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { submitDocuments } from "../redux/slices/documentsUploadSlice";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import FormWrapper from "./FormWrapper";

export default function DocumentsUpload({ onSuccess }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ initialize navigate
  const { loading, error, success } = useSelector((state) => state.documents);

  const [pan, setPan] = useState(null);
  const [aadhaar, setAadhaar] = useState(null);
  const [other, setOther] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [fileError, setFileError] = useState("");

  const handleCloudinaryUpload = async (file, key) => {
    try {
      const url = await uploadToCloudinary(file, (progress) => {
        setUploadProgress((prev) => ({ ...prev, [key]: progress }));
      });
      return url;
    } catch (err) {
      setFileError(err.message || "Upload failed for one or more documents");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFileError("");
    const urls = {};

    if (!pan || !aadhaar) {
      setFileError("PAN and Aadhaar documents are required.");
      return;
    }

    const panUrl = await handleCloudinaryUpload(pan, "pan");
    const aadhaarUrl = await handleCloudinaryUpload(aadhaar, "aadhaar");

    if (!panUrl || !aadhaarUrl) return;

    urls.pan_card_url = panUrl;
    urls.aadhaar_card_url = aadhaarUrl;

    if (other) {
      const otherUrl = await handleCloudinaryUpload(other, "other");
      if (otherUrl) {
        urls.supporting_documents_urls = otherUrl;
      }
    }

    dispatch(submitDocuments(urls));
  };

  // ✅ Redirect on successful submission
  useEffect(() => {
    if (success) {
      if (typeof onSuccess === "function") onSuccess(); // optional chaining
      navigate("/operator-dashboard");
    }
  }, [success, onSuccess, navigate]);

  return (
    <FormWrapper title="Documents Upload">
      <div>
        <label className="block mb-1 font-medium">PAN Card</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setPan(e.target.files[0])}
          className="w-full border px-3 py-2 rounded"
        />
        {uploadProgress.pan && (
          <p className="text-xs text-gray-600 mt-1">PAN Uploading: {uploadProgress.pan}%</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Aadhaar Card</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setAadhaar(e.target.files[0])}
          className="w-full border px-3 py-2 rounded"
        />
        {uploadProgress.aadhaar && (
          <p className="text-xs text-gray-600 mt-1">Aadhaar Uploading: {uploadProgress.aadhaar}%</p>
        )}
      </div>

      <div className="col-span-2">
        <label className="block mb-1 font-medium">Other Supporting Document</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setOther(e.target.files[0])}
          className="w-full border px-3 py-2 rounded"
        />
        {uploadProgress.other && (
          <p className="text-xs text-gray-600 mt-1">Other Uploading: {uploadProgress.other}%</p>
        )}
      </div>

      {fileError && <p className="text-red-500 mt-2">{fileError}</p>}
      {success && <p className="text-green-600 mt-2">Submitted successfully!</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </FormWrapper>
  );
}
