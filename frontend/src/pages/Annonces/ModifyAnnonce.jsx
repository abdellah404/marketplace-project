import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CitiesMorocco } from "../Annonces/data";
import useAnnonces from "../../hooks/useAnnonces";
import useCategories from "../../hooks/useCategories";
import useTheme from "../../hooks/useTheme";

const ModifyAnnonce = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const annonce_id = Number(id);

  const { categoriesData } = useCategories();
  const { getAnnonceDetails, AnnonceDetails, updateAnnonce } = useAnnonces();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const {isDarkMode} = useTheme()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file); // Update useForm
    }
  };

  const userSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    city: Yup.string().required("City is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    image: Yup.mixed()
      .test("fileSize", "Image must be less than 2MB", (value) => {
        return value?.[0] ? value[0].size <= 2 * 1024 * 1024 : true;
      })
      .test("fileType", "Invalid image format (JPG, PNG only)", (value) => {
        return value?.[0]
          ? ["image/jpeg", "image/png"].includes(value[0].type)
          : true;
      }),
    category_id: Yup.number().required("Please select a category"),
  });

  useEffect(() => {
    const fetchAnnonceDetails = async () => {
      try {
        await getAnnonceDetails(annonce_id);
        console.log(AnnonceDetails[0]?.image);
        if (AnnonceDetails[0]?.image) {
          setImagePreview(AnnonceDetails[0].image); // Set the image preview from the backend
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchAnnonceDetails();
  }, [annonce_id]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      id: AnnonceDetails[0]?.id,
      title: AnnonceDetails[0]?.title,
      description: AnnonceDetails[0]?.description,
      city: AnnonceDetails[0]?.city || "",
      price: AnnonceDetails[0]?.price,
      image: AnnonceDetails[0]?.image,
      category_id: AnnonceDetails[0]?.category_id,
    },
  });

  const onSubmit = async (formData) => {
    try {
      // Convert formData to FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category_id", formData.category_id);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("city", formData.city);

      // Append the image file only if it exists
      if (formData.image && formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      // Send the request to update the annonce
      await updateAnnonce(formDataToSend);

      // Display success message to the user
      setTimeout(() => {
        navigate("/app");
      }, 1000);
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <button className="btn btn-secondary mb-3" onClick={handleBackClick}>
            ← Retour
          </button>
          <div className={`card ${isDarkMode ? "bg-secondary text-light" : ""}`}>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}  >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Titre
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="form-control shadow-none border-2"
                    placeholder="Enter your name"
                    {...register("title")}
                  />
                  <p className="text-danger mt-1">{errors.title?.message}</p>
                </div>

                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    Ville
                  </label>
                  <select
                    id="city"
                    className="form-select shadow-none border-2"
                    {...register("city")}
                  >
                    <option defaultValue={user.city}>{user.city}</option>
                    {CitiesMorocco.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger mt-1">{errors.city?.message}</p>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="categorySelect"
                    className="form-label fw-semibold"
                  >
                    Catégorie
                  </label>
                  <select
                    id="categorySelect"
                    className="form-select border-primary"
                    {...register("category_id")}
                  >
                    {categoriesData.map((category) => (
                      <option key={category.name} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger mt-1">
                    {errors.category_id?.message}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Prix (DH)
                  </label>
                  <input
                    id="price"
                    type="number"
                    className="form-control shadow-none border-2"
                    placeholder="Enter your phone number"
                    {...register("price")}
                  />
                  <p className="text-danger mt-1">{errors.price?.message}</p>
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label fw-semibold">
                    Ajouter une nouvelle image
                  </label>
                  <input
                    id="price"
                    accept="image/jpeg, image/png"
                    type="file"
                    className="form-control border-primary"
                    placeholder="Entrez le prix"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="mt-3 d-flex justify-content-center align-items-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-thumbnail w-50"
                      />
                    </div>
                  )}
                  <p className="text-danger mt-1">{errors.image?.message}</p>
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-dark w-100 mb-3"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyAnnonce;
