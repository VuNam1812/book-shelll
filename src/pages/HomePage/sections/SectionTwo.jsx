import React, { useMemo } from "react";
import ReactSelect from "react-select";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

const SectionTwo = ({ onSubmitSearch }) => {
  const { etags, authors } = useSelector((state) => state?.bookReducer);
  const { register, control, handleSubmit } = useForm();
  const etagOptions = useMemo(() => {
    return etags?.map((tag) => ({
      value: tag,
      label: tag,
    }));
  }, [etags]);

  const authorOptions = useMemo(() => {
    return authors?.map((author) => ({
      value: author,
      label: author,
    }));
  }, [authors]);

  const handleSubmitForm = (data, e) => {
    onSubmitSearch && onSubmitSearch(data);
  };

  return (
    <section className="section-two">
      <div className="container">
        <div className="wrapper">
          <form
            className="inputs-group"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="form-group form-search">
              <div className="form-input">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  placeholder="Type to search"
                  {...register("search")}
                ></input>
                <button type="submit">Search</button>
              </div>
            </div>
            <div
              className="form-group form-group-multi"
              style={{ maxWidth: 500 }}
            >
              <div className="form-multi-item form-etag">
                <Controller
                  control={control}
                  name="etag"
                  render={({ field }) => {
                    return (
                      <ReactSelect
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder={"Select etag"}
                        isClearable
                        value={
                          etagOptions.find(
                            (val) => val.value === field.value
                          ) || null
                        }
                        onChange={(newValue) => {
                          field.onChange(newValue?.value || "");
                        }}
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
                        options={etagOptions}
                      />
                    );
                  }}
                />
              </div>
              <div className="form-multi-item form-author">
                {" "}
                <Controller
                  control={control}
                  name="author"
                  render={({ field }) => {
                    return (
                      <ReactSelect
                        isClearable
                        placeholder={"Select author"}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        value={
                          authorOptions.find(
                            (val) => val.value === field.value
                          ) || null
                        }
                        onChange={(newValue) => {
                          field.onChange(newValue?.value || "");
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,
                          colors: {
                            ...theme.colors,
                            primary: "#00be00",
                            primary25: "#e2fee5",
                            primary50: "#e2fee5",
                          },
                        })}
                        options={authorOptions}
                      />
                    );
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
