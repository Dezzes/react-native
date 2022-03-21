import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import HotelCard from './screens/HotelCardScreen';
import {IHotel, IRequestHotel} from './models/Hotel';
import Favorites from './components/Favorites';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HotelSearch from './components/HotelSearch';
import SearchInput from './components/SearchInput';
import Suggestions from './screens/Suggestions';

export type StackParams = {
  Suggestions: {
    searchParams: IRequestHotel;
  };
  Home: undefined;
  LoginScreen: undefined;
  HotelCard: {
    hotel: IHotel;
  };
};

const RootStack = createNativeStackNavigator<StackParams>();
const SuggestionStack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Поиск" component={Suggestions} />
      <Tab.Screen name="Избранное" component={Favorites} />
    </Tab.Navigator>
  );
};

const SuggestionScreen = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<IRequestHotel>({
    location: 'Москва',
    checkIn: new Date(),
    dateCount: '1',
  });

  return (
    <SuggestionStack.Navigator
      screenOptions={{
        header: () => {
          if (showSearch) {
            return (
              <HotelSearch
                setShowSearch={setShowSearch}
                setSearch={setSearch}
              />
            );
          } else {
            return (
              <SearchInput setShowSearch={setShowSearch} search={search} />
            );
          }
        },
      }}>
      <SuggestionStack.Screen name="Suggestion" component={TabStack} />
    </SuggestionStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="HotelCard" component={HotelCard} />
        <RootStack.Screen name="Suggestions" component={SuggestionScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
