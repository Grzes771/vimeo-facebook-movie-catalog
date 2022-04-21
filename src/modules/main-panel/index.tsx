import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import {
  addVimeoDemoData,
  clearVimeoVideosData,
} from '../../store/get-vimeo-videos/actions';
import {
  addYoutubeDemoData,
  clearYoutubeVideosData,
} from '../../store/get-youtube-videos/actions';
import {
  setDisplayStarted,
  setFavoriteStarted,
  setOrderStarted,
} from '../../store/change-panel-values/actions';

type TProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
export const MainPanel = (props: TProps) => {
  const { setCurrentPage } = props;

  const dispatch = useDispatch();

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDisplayStarted(event.target.value));
  };

  const handleFavoriteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFavoriteStarted(event.target.value));
    setCurrentPage(0);
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setOrderStarted(event.target.value));
    setCurrentPage(0);
  };

  const removeData = () => {
    dispatch(clearVimeoVideosData());
    dispatch(clearYoutubeVideosData());
  };

  const loadDemo = () => {
    dispatch(addYoutubeDemoData());
    dispatch(addVimeoDemoData());
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
          onChange={(e) => handleDisplayChange(e)}
        >
          <option>vertical</option>
          <option>horizontal</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="favorite">Favorite</Label>
        <Input
          type="select"
          name="favorite"
          id="favorite"
          onChange={(e) => handleFavoriteChange(e)}
        >
          <option>all</option>
          <option>favorite</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="orderBy">Order by</Label>
        <Input
          type="select"
          name="order"
          id="orderBy"
          onChange={(e) => handleOrderChange(e)}
        >
          <option>newest</option>
          <option>oldest</option>
        </Input>
      </FormGroup>

      <Button color="success" className="panel-btn" onClick={loadDemo}>
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
