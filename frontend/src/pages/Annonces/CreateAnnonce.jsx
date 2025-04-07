import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCategories from "../../hooks/useCategories";
import { toast } from "react-toastify"; // Notification
import { CitiesMorocco } from "./data";
import { Navigate, useNavigate } from "react-router";
import useAnnonces from "../../hooks/useAnnonces";
import useAuth from "../../hooks/useAuth";

const CreateAnnonce = () => {
  const [formStep, setFormStep] = useState(0);
  const { categoriesData } = useCategories();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { addAnnonce } = useAnnonces();
  const { user } = useAuth();
  // Handle file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file); // Mettre à jour useForm
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
    setValue, // ✅ Ajout de setValue ici
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

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log("User Data Submitted:", data, "  user id   ", user.id);
    await addAnnonce(data);
    toast.success("Annonce publiée avec succès ! 🚀", {
      position: "top-left",
      autoClose: 3000,
    });
    // 🔄 Réinitialiser le formulaire
    reset();
    // 🔀 Rediriger vers une autre page (ex: liste des annonces)
    navigate("/app");
  };

  const RenderButton = () => {
    return (
      <div className="d-flex justify-content-between mt-5">
        {formStep > 0 && (
          <button
            type="button"
            className="btn btn-outline-secondary px-4"
            onClick={() => setFormStep((prev) => prev - 1)}
            disabled={!isValid}
          >
            <i className="bi bi-arrow-left"></i> Retour
          </button>
        )}

        {formStep < 2 ? (
          <button
            type="button"
            className="btn btn-dark px-4"
            onClick={completeFormStep}
            disabled={!isValid}
          >
            Suivant <i className="bi bi-arrow-right"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-success px-4"
            disabled={isSubmitting || !isValid}
          >
            <i className="bi bi-check-circle"></i> Publier
          </button>
        )}
      </div>
    );
  };

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-5">
            <div className="register-card p-4 border rounded-3 shadow-sm bg-white">
              <h2 className="text-center mb-4 fw-bold text-secondary text-uppercase">
                Publier une annonce
              </h2>

              {/* Étape 0 : Sélection de la catégorie et de la ville */}
              {formStep === 0 && (
                <section>
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
                    <label htmlFor="city" className="form-label fw-semibold">
                      Ville
                    </label>
                    <select
                      id="city"
                      className="form-select border-primary shadow-none"
                      {...register("city")}
                    >
                      {CitiesMorocco.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <p className="text-danger mt-1">{errors.city?.message}</p>
                  </div>
                </section>
              )}

              {/* Étape 1 : Titre & Description */}
              {formStep === 1 && (
                <section>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-semibold">
                      Titre de l'annonce
                    </label>
                    <input
                      id="title"
                      type="text"
                      className="form-control border-primary"
                      placeholder="Titre de l'annonce"
                      {...register("title")}
                    />
                    <p className="text-danger mt-1">{errors.title?.message}</p>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="description"
                      className="form-label fw-semibold"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="form-control border-primary"
                      placeholder="Décrivez votre annonce"
                      {...register("description")}
                    />
                    <p className="text-danger mt-1">
                      {errors.description?.message}
                    </p>
                  </div>
                </section>
              )}

              {/* Étape 2 : Téléphone & Prix */}
              {formStep === 2 && (
                <section>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label fw-semibold">
                      Prix
                    </label>
                    <input
                      id="price"
                      type="number"
                      className="form-control border-primary"
                      placeholder="Entrez le prix"
                      {...register("price")}
                    />
                    <p className="text-danger mt-1">{errors.price?.message}</p>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label fw-semibold">
                      Ajouter une image
                    </label>
                    <input
                      id="price"
                      accept="image/jpeg, image/png"
                      type="file"
                      className="form-control border-primary"
                      placeholder="Entrez le prix"
                      onChange={handleImageChange}
                    />
                    <p className="text-danger mt-1">{errors.image?.message}</p>
                    {imagePreview && (
                      <div className="mt-3">
                        <img
                          src={imagePreview}
                          alt="Aperçu"
                          className="img-thumbnail"
                          width="150"
                        />
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Boutons de navigation */}
              <RenderButton />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateAnnonce;
