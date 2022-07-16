import numeral from "numeral";
import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { createBook, fetchBookDetail } from "../../redux/slices/bookSlice";
import { useNavigate, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import _ from "lodash";

const CreateUpdatePage = ({ type }) => {
  const { register, reset, control, watch, handleSubmit, setValue } = useForm();
  const authors = useSelector((state) => state?.bookReducer?.authors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const languageOptions = ["vn", "en"].map((item) => ({
    value: item,
    label: item,
  }));

  const authorOptions = useMemo(() => {
    return authors.map((item) => ({
      value: item,
      label: item,
    }));
  }, []);

  const handleSubmitForm = async (data, e) => {
    await Swal.fire({
      title: type === "EDIT" ? "Updating" : "Creating",
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
        dispatch(createBook(data));
      },
    });

    Swal.fire({
      text: `${type === "EDIT" ? "Update" : "Create"} Book Successfully`,
      icon: "success",
      showCloseButton: true,
      showConfirmButton: true,
    }).then(() => {
      navigate("/");
    });
  };

  const handleUploadImage = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const url = URL.createObjectURL(files[0]);
    setValue("volumeInfo.imageLinks.thumbnail", url);
  };

  const formatNumber = (value) => {
    let clone = value;
    if (/\D/g.test(clone)) {
      clone = clone.replace(/\D/g, "");
    }

    return clone;
  };

  useEffect(() => {
    if (type === "EDIT") {
      (async () => {
        const resDispatch = await dispatch(fetchBookDetail(params.bookId));
        const book = unwrapResult(resDispatch);

        const formData = {
          volumeInfo: _.pick(book.volumeInfo, [
            "authors",
            "pageCount",
            "imageLinks.thumbnail",
            "description",
            "title",
            "publisher",
            "publishedDate",
            "language",
          ]),
          saleInfo: _.pick(book.saleInfo, ["retailPrice.amount"]),
        };
        setTimeout(() => {
          reset(formData, { keepDefaultValues: true });
        }, 100);
      })();
    }
  }, [params, dispatch]);

  return (
    <main className="create-update-page">
      <section className="section-one">
        <div className="container">
          <div className="wrapper">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="form-input">
                <div className="inputs-group">
                  <div className="form-group">
                    <label htmlFor="">Book Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      {...register("volumeInfo.title")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Publisher</label>
                    <input
                      type="text"
                      placeholder="Publisher"
                      {...register("volumeInfo.publisher")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Date</label>
                    <input
                      type="date"
                      {...register("volumeInfo.publishedDate")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Page Count</label>
                    <Controller
                      name="volumeInfo.pageCount"
                      control={control}
                      render={({ field }) => {
                        return (
                          <input
                            type="text"
                            maxLength={12}
                            placeholder="0"
                            {...field}
                            value={
                              field.value
                                ? numeral(field.value).format("0,0")
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              const format = formatNumber(value);
                              field.onChange(format ? +format : 0);
                            }}
                          />
                        );
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="">Language</label>
                    <Controller
                      name="volumeInfo.language"
                      control={control}
                      render={({ field }) => {
                        return (
                          <ReactSelect
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select language"
                            value={
                              languageOptions.find(
                                (val) => val.value === field.value
                              ) || null
                            }
                            onChange={(newValue) => {
                              field.onChange(newValue?.value);
                            }}
                            isClearable
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 0,
                              colors: {
                                ...theme.colors,
                                primary: "#00be00",
                                primary25: "#e2fee5;",
                                primary50: "#e2fee5);",
                              },
                            })}
                            options={languageOptions}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Price</label>
                    <Controller
                      name="saleInfo.retailPrice.amount"
                      control={control}
                      render={({ field }) => {
                        return (
                          <input
                            type="text"
                            maxLength={12}
                            placeholder="0"
                            {...field}
                            value={
                              field.value
                                ? numeral(field.value).format("0,0")
                                : ""
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              const format = formatNumber(value);

                              field.onChange(format ? +format : 0);
                            }}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Author</label>
                    <Controller
                      name="volumeInfo.authors"
                      control={control}
                      render={({ field }) => {
                        return (
                          <ReactSelect
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select author"
                            value={
                              field.value?.map((val) => ({
                                value: val,
                                label: val,
                              })) || null
                            }
                            onChange={(newValue) => {
                              field.onChange(
                                newValue?.map((val) => val.value) || []
                              );
                            }}
                            isMulti
                            isClearable
                            theme={(theme) => ({
                              ...theme,
                              borderRadius: 0,
                              colors: {
                                ...theme.colors,
                                primary: "#00be00",
                                primary25: "#e2fee5;",
                                primary50: "#e2fee5);",
                              },
                            })}
                            options={authorOptions}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="form-group form-group-ckeditor">
                    <label htmlFor="">Description</label>
                    <Controller
                      name="volumeInfo.description"
                      control={control}
                      render={({ field }) => {
                        return (
                          <CKEditor
                            editor={ClassicEditor}
                            onReady={(editor) => {
                              console.log(editor);
                            }}
                            data={field.value}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              field.onChange(data || "");
                            }}
                          />
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="">
                  <label
                    className="input-file"
                    style={{
                      backgroundImage: `url(${watch(
                        "volumeInfo.imageLinks.thumbnail"
                      )})`,
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      hidden
                    />
                    <span>
                      <i className="fa-solid fa-cloud-arrow-up fa-3x"></i>
                    </span>
                  </label>
                </div>
              </div>
              <div className="form-btn">
                <button type="submit" style={{ marginTop: "1rem" }}>
                  {type === "EDIT" ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreateUpdatePage;
