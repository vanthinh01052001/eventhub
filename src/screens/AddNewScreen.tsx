import React, {useState} from 'react';
import ContainerComponent from '../components/ContainerComponent';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../components';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import ChoiceLocation from '../components/ChoiceLocation';
import {View} from 'react-native';

const initValues = {
  title: '',
  description: '',
  location: {
    title: '',
    address: '',
  },
  imageUrl: '',
  users: [''],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};
const AddNewScreen = () => {
  const auth = useSelector(authSelector);

  const [eventData, setEventData] = useState<any>({
    ...initValues,
    authorId: auth.id,
  });
  const handleChangeValue = (key: string, value: string) => {
    const items = {...eventData};
    items[`${key}`] = value;

    setEventData(items);
  };
  const handleAddEvent = async () => {
    console.log(eventData);
  };
  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new " title />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          allowClear
          placeholder="Title"
          value={eventData.title}
          onChange={val => handleChangeValue('title', val)}
        />
        <ChoiceLocation />
        <InputComponent
          allowClear
          placeholder="Description"
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
          multiline
          numberOfLine={3}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="Add New"
          onPress={handleAddEvent}
          type="primary"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
