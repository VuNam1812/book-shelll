import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteBook } from "../../../redux/slices/bookSlice";

const SectionTop = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRemoveBook = () => {
    Swal.fire({
      title: "Remove",
      text: `Remove book from list`,
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBook({ id: params.bookId }));
        Swal.fire({
          title: "Removing",
          timer: 1000,
          allowEnterKey: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
          didClose: () => {
            navigate("/");
          },
        });
      }
    });
  };

  return (
    <div
      className="container"
      style={{ justifyContent: "flex-end", marginBottom: "1rem" }}
    >
      <button style={{ backgroundColor: "#dc3545" }} onClick={handleRemoveBook}>
        Remove
      </button>
      <button
        style={{ backgroundColor: "rgba(0, 190, 0, 0.3)", color: "#00be00" }}
        onClick={() => {
          navigate(`/books/edit/${params.bookId}`);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default SectionTop;
