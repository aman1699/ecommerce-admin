import React, { useEffect, useState } from "react";
import Layout from "./../../../components/layout/index";
import { Container, Row, Col,Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "./../../../actions/categoryaction";
import Input from './../../../components/layout/UI/Input/index';
import NewModal from './../../../components/layout/UI/Input/Modal/index';
const Category = (props) => {
const category = useSelector((state) => state.category);
const [show, setShow] = useState(false);
const [categoryName, setCategoryName] = useState('');
const [parentCategoryId, setParentCategoryId] = useState('');
const [categoryImage, setCategoryImage] = useState('');    
  const dispatch = useDispatch();
  
  //  useEffect(() => {
  //  dispatch(getAllCategory());
 // }, []);
    
  const handleClose = () => {
   let form = new FormData();
   form.append('name', categoryName);
   form.append('parentId', parentCategoryId);
   form.append('categoryImage', categoryImage);
    console.log(form)
  
    dispatch(addCategory(form));
    setShow(false);
  }
  const handleShow = () => setShow(true);

   
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
    };
    
    const createCategoriesList = (categories, options = []) => {
        for(let category of categories)
        {
            options.push({
                value: category._id,
                name: category.name
            });   
            if (category.children.length > 0) {
                createCategoriesList(category.children, options);
            }
        }        
        return options
  }
  const handleCategoryImage = (e) => {
    e.preventDefault();
    setCategoryImage(e.target.files[0]);
  }
 
    return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={6}>
            <div style={{ dispaly: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
            </div>
          </Col>
          <Col md={6}>
            <div style={{ float: "right", marginTop: 10 }}>
             <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>
       <NewModal
          show={show}
          handleClose={handleClose}
          modalTitle={'Add New Category'}>
           <Input
                      value={categoryName }
                      placeholder='Category Name'
                      onChange={(e)=>setCategoryName(e.target.value)}
                  />
             <select
              className="form-control"
              value={parentCategoryId}
              onChange={(e)=>setParentCategoryId(e.target.value)}>
                        <option>Select category</option>
                        {
                            createCategoriesList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
            <Input type="file" name="categoryImage" onChange={handleCategoryImage}/>
      </NewModal>
       
    </Layout>
  );
};

export default Category;
