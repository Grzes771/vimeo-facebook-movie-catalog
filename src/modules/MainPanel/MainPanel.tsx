import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';



  
export const MainPanel = (props: any) => {
  
  const {setPanelData, setVideosLocalContainer} = props
  const [inputValues, setInputValues] = useState({
    display: 'vertical',
    favorite: 'all',
    order: 'newest',
  });

  useEffect(() => {
    setPanelData(inputValues);
  }, [inputValues]); 
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });

  };
   const removeData = () => {
    setVideosLocalContainer([]);
  };

  return (
    <Form>
      <FormGroup>
        <Label for="display">Display</Label>
        <Input
          type="select"
          className="form-control"
          name="display"
          id="display"
          onChange={(e) => handleChange(e)}
        >
          <option>vertical</option>
          <option>horizontal</option>
        </Input>
      </FormGroup>

      
      <FormGroup>
        <Label for="favorite">Favorite</Label>
        <Input type="select" name="favorite" id="favorite" onChange={(e) => handleChange(e)}>
          <option>all</option>
          <option>favorite</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="orderBy">Order by</Label>
        <Input type="select" name="order" id="orderBy" onChange={(e) => handleChange(e)}>
          <option>newest</option>
          <option>oldest</option>
        </Input>
      </FormGroup>
    
      <Button color="success" className="panel-btn">
        Load demo
      </Button>
      <br />
      <br />
      <Button color="danger" className="panel-btn" onClick={removeData}>
        Remove all
      </Button>
    </Form>
  );
};
