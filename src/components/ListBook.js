import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Table, Modal, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import {Formik, Field, Form as FormikForm, ErrorMessage} from "formik";

function ListBook() {
    const navigate = useNavigate();
    const [books, setBook] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCategories, setSearchCategories] = useState("");

    useEffect(() => {
        async function getPhones() {
            try {
                const response = await axios.get("http://localhost:3070/book");
                setBook(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        async function getCategories() {
            try {
                const response = await axios.get("http://localhost:3070/category");
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getPhones()
        getCategories();
    }, []);

    const list = books.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
                        <th>Code</th>
                        <th>Title</th>
                        <th>DayEnter</th>
                        <th>Category</th>
                        <th>Quantity</th>


                    </tr>
                    </thead>
                    <tbody>


                    {
                        list.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>Không tìm thấy</td>
                            </tr>
                        ) : (
                            list.sort((a, b) => a.quantity - b.quantity).map((book, index) => (
                                <tr key={book.id}>
                                    <td>{index + 1}</td>
                                    <td>{book.code}</td>
                                    <td>{book.name}</td>
                                    <td>{book.day}</td>
                                    <td>{book.category}</td>
                                    <td>{book.quantity}</td>
                                </tr>
                            ))
                        )
                    }

                    </tbody>
                </Table>

            </div>
        </>
    )
}

export default ListBook