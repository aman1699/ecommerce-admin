import React, { useState } from "react";
import Layout from "./../../../components/layout/index";
import { Row, Modal, Col, Button, Container, Table } from "react-bootstrap";
import Input from "./../../../components/layout/UI/Input/index";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../../actions/productaction";
import NewModal from "./../../../components/layout/UI/Input/Modal/index";
import './style.css';
import { generatePublicUrl } from "../../../urlconfig";

const Products = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productPictures, setProduct] = useState([]);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    let form = new FormData();
    form.append("name", name); 
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const createCategoriesList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
      });
      if (category.children.length > 0) {
        createCategoriesList(category.children, options);
      }
    }
    return options;
  };
  const handleProductPictures = (e) => {
    setProduct([...productPictures, e.target.files[0]]);
  };
  console.log(productPictures);

  const renderProduct = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0 ?
            product.products.map(product =>
              <tr style={{cursor:'pointer'}} onClick={()=>showProductDetailModal(product)} key={product._id}>
                <td>2</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td>{product.category.name}</td>
              </tr>) : null}
        </tbody>
      </Table>
    );
  };
  const renderAddProductModal = () => {
    
    return (
      <NewModal
      show={show}
      handleClose={handleClose}
      modalTitle={"Add new Products"}
    >
      <Input
        label="Name"
        value={name}
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Price"
        value={price}
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        label="quantity"
        value={quantity}
        placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Input
        label="Description"
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="form-control"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option>Select category</option>
        {createCategoriesList(category.categories).map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {productPictures.length > 0
        ? productPictures.map((pic, index) => (
            <div key={index}>{pic.name}</div>
          ))
        : null}
      <Input
        type="file"
        name="ProductPictures"
        onChange={handleProductPictures}
      />
    </NewModal>
         )    
  }
  const handleCloseProductDetail = () => {
    setProductDetailModal(false);
  }
  const showProductDetailModal = (product) => {
    console.log(product.category.name)
    setProductDetail(product);
    setProductDetailModal(true);
  }
  const showAddProductDetails = () => {
    if (!productDetail) {
      return null;
    }
    return (
      <NewModal
        show={productDetailModal}
        handleClose={handleCloseProductDetail }
        modalTitle={'Product Details'}
        size='lg'
      >
        <Row>
          <Col md="6">
            <label style={{fontWeight:'bold'}}>Name</label>
            <p>{productDetail.name}</p>
          </Col>
          <Col md="6">
            <label style={{fontWeight:'bold'}}>Price</label>
            <p>{productDetail.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label style={{fontWeight:'bold'}}>Quantity</label>
            <p>{productDetail.quantity}</p>
          </Col>
          <Col md="6">
            <label style={{fontWeight:'bold'}}>Category</label>
            <p>{productDetail.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
          <label style={{fontWeight:'bold'}}>Description</label>
            <p>{productDetail.description}</p>
          </Col>
        </Row>
        
          <Row>
          <Col md="6" style={{ display: 'flex' }} >
            {productDetail.productPictures.map(picture => 
              <div key={picture._id} className="productImg">
                <img src={generatePublicUrl(picture.img)}/>
            </div>
          )}
          </Col>
            </Row>
        { console.log(productDetail.category.name,"ak")}
      </NewModal>
    )
  }            
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={6}>
            <div style={{ dispaly: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
            </div>
          </Col>
          <Col md={6}>
            <div style={{ float: "right", marginTop: 10 }}>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProduct()}</Col>
        </Row>
      </Container>

      {renderAddProductModal()}
      {showAddProductDetails()}
    </Layout>
  );
};

export default Products;
