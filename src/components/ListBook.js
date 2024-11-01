import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Table, Modal, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import {Formik, Field, Form as FormikForm, ErrorMessage} from "formik";

function ListPhone() {
    const navigate = useNavigate();
    const [phones, setPhones] = useState([]);
    const [phoneToDelete, setPhoneToDelete] = useState([]);
    const [phoneToEdit, setPhoneToEdit] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // State cho tìm kiếm
    const [searchCategories, setSearchCategories] = useState("");

    useEffect(() => {
        async function getPhones() {
            try {
                const response = await axios.get("http://localhost:3090/smartPhone");
                setPhones(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        async function getCategories() {
            try {
                const response = await axios.get("http://localhost:3090/category");
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getPhones()
        getCategories();
    }, [phones]);
    const handleEditClick = (phone) => {
        // setBookToEdit({nameBook: book.nameBook, quantity: book.quantity, category: book.category, id: book.id});
        // setShowEditModal(true);
        navigate(`/edit/${phone.id}`);
    };
    const handleDeleteClick = (phone) => {
        setPhoneToDelete(phone);
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = async () => {
        setShowDeleteModal(false)
        try {
            await axios.delete(`http://localhost:3090/smartPhone/${phoneToDelete.id}`);
            toast.success('xoá thành công.');
        } catch (error) {
            console.log(error);
        }
    };
    const list = phones.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        book.category.includes(searchCategories)
    )
    return (
        <>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Book List</h2>

                <Formik
                    initialValues={{search: "", search2: ""}}
                    onSubmit={(values) => {
                        setSearchTerm(values.search);
                        setSearchCategories(values.search2);
                    }}
                >
                    {() => (
                        <FormikForm className="mb-3">
                            <Form.Group className="mb-3" controlId="formSearch">
                                <Form.Label>Tìm kiếm sách</Form.Label>
                                <Field
                                    as={Form.Control}
                                    type="text"
                                    placeholder="Nhập tên sách"
                                    name="search"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCategory">
                                <Form.Label>Thể loại</Form.Label>
                                <Field
                                    as="select"
                                    name="search2"
                                    className="form-control"
                                >
                                    <option value="">Chọn thể loại</option>
                                    {categories.map((category) => (
                                        <option key={category.index} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Field>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Tìm
                            </Button>
                        </FormikForm>
                    )}
                </Formik>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((phone, index) => (
                            <tr key={phone.id}>
                                <td>{index + 1}</td>
                                <td>{phone.name}</td>
                                <td>{phone.quantity}</td>
                                <td>{phone.category}</td>
                                <td>
                                    <Button variant="primary" size="sm" className="me-2"
                                            onClick={() => handleEditClick(phone)}
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(phone)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Modal show={showDeleteModal}>
                    <Modal.Header closeButton onClick={() => setShowDeleteModal(false)}>
                        <Modal.Title>Xác Nhận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc chắn muốn xóa sách "{phoneToDelete?.nameBook}" không?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ListPhone