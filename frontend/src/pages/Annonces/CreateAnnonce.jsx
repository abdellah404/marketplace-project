import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCategories from "../../hooks/useCategories";
import { toast } from "react-toastify";
import { CitiesMorocco } from "./data";
import { useNavigate } from "react-router";
import useAnnonces from "../../hooks/useAnnonces";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import axioService from "../../services/api";

const CreateAnnonce = () => {
  const { isDarkMode } = useTheme();
  const [formStep, setFormStep] = useState(0);
  const { categoriesData } = useCategories();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { addAnnonce } = useAnnonces();
  const { user } = useAuth();
  const [subcategories, setSubcategories] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const completeFormStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const userSchema = Yup.object({
    title: Yup.string().required("Donner le titre de l'annonce"),
    category_id: Yup.number().required("Sélectionner une catégorie"),
    city: Yup.string().required("Sélectionner une ville"),
    description: Yup.string().required("La description est obligatoire"),
    price: Yup.number()
      .min(0, "Le prix doit être un nombre positif")
      .required(),
    image: Yup.mixed()
      .test("fileSize", "L'image doit être inférieure à 2MB", (value) => {
        return value?.[0] ? value[0].size <= 2 * 1024 * 1024 : true;
      })
      .test(
        "fileType",
        "Format d'image invalide (JPG, PNG uniquement)",
        (value) => {
          return value?.[0]
            ? ["image/jpeg", "image/png"].includes(value[0].type)
            : true;
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      title: "pc",
      description: "kenitra",
      price: "1425",
      isActive: 0,
      isValidated: 0,
      user_id: user.id,
    },
  });

  const selectedCategoryId = watch("category_id");
  useEffect(() => {
    if (selectedCategoryId) {
      axioService
        .get(`/subcategories/${selectedCategoryId}`)
        .then((res) => setSubcategories(res.data))
        .catch(() => setSubcategories([]));
    } else {
      setSubcategories([]);
    }
  }, [selectedCategoryId]);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    await addAnnonce(data);
    toast.success("Annonce publiée avec succès ! 🚀", {
      position: "top-left",
      autoClose: 3000,
      theme: isDarkMode ? "dark" : "light",
    });
    reset();
    navigate("/app");
  };

  const RenderButton = () => {
    return (
      <div className="d-flex justify-content-between mt-4">
        {formStep > 0 && (
          <button
            type="button"
            className={`btn ${
              isDarkMode ? "btn-outline-light" : "btn-outline-secondary"
            } px-4`}
            onClick={() => setFormStep((prev) => prev - 1)}
            disabled={!isValid}
          >
            <i className="bi bi-arrow-left me-2"></i>Retour
          </button>
        )}

        {formStep < 2 ? (
          <button
            type="button"
            className={`btn  ${isDarkMode ? "" : "btn-dark"} px-4`}
            onClick={completeFormStep}
            disabled={!isValid}
            style={{
              backgroundColor: isDarkMode ? "#6a0dad" : "black",
              color: "#ffffff",
            }}
          >
            Suivant <i className="bi bi-arrow-right ms-2"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-success px-4"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Publication...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Publier
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className={`min-vh-100 py-5 ${
        isDarkMode ? "bg-dark text-light" : "bg-light"
      }`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-6">
              <div
                className={`card ${
                  isDarkMode
                    ? "bg-secondary text-light border-light"
                    : "bg-white border-light"
                } shadow-lg`}
              >
                <div
                  className={`card-header ${
                    isDarkMode ? "bg-dark" : "bg-primary"
                  } py-3`}
                >
                  <h2 className="text-center mb-0 fw-bold text-white">
                    <i className="bi bi-megaphone me-2"></i>
                    Publier une annonce
                  </h2>
                </div>

                <div className="card-body p-4 p-md-5">
                  {/* Progress indicator */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`d-flex flex-column align-items-center ${
                            formStep >= step - 1
                              ? isDarkMode
                                ? "text-light"
                                : "text-dark"
                              : "text-muted"
                          }`}
                        >
                          <div
                            className={`rounded-circle d-flex align-items-center justify-content-center ${
                              formStep >= step - 1
                                ? isDarkMode
                                  ? "bg-primary text-white"
                                  : "bg-primary text-white"
                                : isDarkMode
                                ? "bg-dark text-white border border-light"
                                : "bg-light text-muted border"
                            }`}
                            style={{ width: "36px", height: "36px" }}
                          >
                            {step}
                          </div>
                          <small className="mt-1 text-center">
                            {step === 1
                              ? "Catégorie"
                              : step === 2
                              ? "Détails"
                              : "Prix/Image"}
                          </small>
                        </div>
                      ))}
                    </div>
                    <div
                      className={`progress ${isDarkMode ? "bg-dark" : ""}`}
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${(formStep + 1) * 33.33}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Step 0: Category and city selection */}

                  {formStep === 0 && (
                    <section>
                      <div className="mb-4">
                        <label
                          htmlFor="categorySelect"
                          className="form-label fw-semibold"
                        >
                          Catégorie
                        </label>
                        <select
                          id="categorySelect"
                          className={`form-select ${
                            isDarkMode
                              ? "bg-dark text-light border-light"
                              : "border-primary"
                          }`}
                          {...register("category_id")}
                        >
                          <option value="">
                            -- Sélectionnez une catégorie --
                          </option>
                          {categoriesData.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        <p className="text-danger mt-1">
                          {errors.category_id?.message}
                        </p>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="subcategorySelect"
                          className="form-label fw-semibold"
                        >
                          Sous-catégorie
                        </label>
                        <select
                          id="subcategorySelect"
                          className={`form-select ${
                            isDarkMode
                              ? "bg-dark text-light border-light"
                              : "border-primary"
                          }`}
                          {...register("subcategory_id")}
                        >
                          <option value="">
                            -- Sélectionnez une sous-catégorie --
                          </option>
                          {subcategories &&
                            subcategories.map((sub) => (
                              <option key={sub.id} value={sub.id}>
                                {sub.name}
                              </option>
                            ))}
                        </select>
                        <p className="text-danger mt-1">
                          {errors.subcategory_id?.message}
                        </p>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="city"
                          className="form-label fw-semibold"
                        >
                          Ville
                        </label>
                        <select
                          id="city"
                          className={`form-select ${
                            isDarkMode
                              ? "bg-dark text-light border-light"
                              : "border-primary"
                          }`}
                          {...register("city")}
                        >
                          {CitiesMorocco.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                        <p className="text-danger mt-1">
                          {errors.city?.message}
                        </p>
                      </div>

                      
                    </section>
                  )}

                  {/* Step 1: Title and description */}
                  {formStep === 1 && (
                    <section>
                      <div className="mb-4">
                        <label
                          htmlFor="title"
                          className="form-label fw-semibold"
                        >
                          Titre de l'annonce
                        </label>
                        <input
                          id="title"
                          type="text"
                          className={`form-control ${
                            isDarkMode
                              ? "bg-dark text-light border-light"
                              : "border-primary"
                          }`}
                          placeholder="Titre de l'annonce"
                          {...register("title")}
                        />
                        <p className="text-danger mt-1">
                          {errors.title?.message}
                        </p>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="description"
                          className="form-label fw-semibold"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          className={`form-control ${
                            isDarkMode
                              ? "bg-dark text-light border-light"
                              : "border-primary"
                          }`}
                          placeholder="Décrivez votre annonce"
                          rows="5"
                          {...register("description")}
                        />
                        <p className="text-danger mt-1">
                          {errors.description?.message}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Step 2: Price and image */}
                  {formStep === 2 && (
                    <section>
                      <div className="mb-4">
                        <label
                          htmlFor="price"
                          className="form-label fw-semibold"
                        >
                          Prix (DH)
                        </label>
                        <div className="input-group">
                          <span
                            className={`input-group-text ${
                              isDarkMode
                                ? "bg-dark text-light border-light"
                                : "bg-light border-primary"
                            }`}
                          >
                            DH
                          </span>
                          <input
                            id="price"
                            type="number"
                            className={`form-control ${
                              isDarkMode
                                ? "bg-dark text-light border-light"
                                : "border-primary"
                            }`}
                            placeholder="Entrez le prix"
                            {...register("price")}
                          />
                        </div>
                        <p className="text-danger mt-1">
                          {errors.price?.message}
                        </p>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="image"
                          className="form-label fw-semibold"
                        >
                          Ajouter une image
                        </label>
                        <div
                          className={`border rounded-3 p-3 ${
                            isDarkMode
                              ? "bg-dark text-light border-light"
                              : "bg-light border-primary"
                          }`}
                        >
                          <input
                            id="image"
                            accept="image/jpeg, image/png"
                            type="file"
                            className={`form-control ${
                              isDarkMode
                                ? "bg-dark text-light border-light"
                                : "border-primary"
                            }`}
                            onChange={handleImageChange}
                          />
                          <p className="text-danger mt-1">
                            {errors.image?.message}
                          </p>
                          {imagePreview && (
                            <div className="mt-3 text-center">
                              <img
                                src={imagePreview}
                                alt="Aperçu"
                                className={`img-thumbnail ${
                                  isDarkMode ? "border-light" : ""
                                }`}
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "200px",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                  )}

                  <RenderButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAnnonce;