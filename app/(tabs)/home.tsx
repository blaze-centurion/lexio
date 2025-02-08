import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  Modal,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { icons } from "@/constants";
import { getWords } from "@/lib/appwrite";
import useAppwrite from "@/hooks/useAppwrite";
import VocabCard from "@/components/VocabCard";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const { data, isLoading, refetch } = useAppwrite(getWords);
  const [filteredData, setFilteredData] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [newWordInput, setNewWordInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (query == "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((vocabData) =>
          vocabData.word.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [data, query]);

  useEffect(() => {
    const fn = async () => {
      try {
        const resp = await fetch('https://wordsapiv1.p.rapidapi.com/words/lovely', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': "977aff2bb0msh899fd4df22c57bbp12a235jsn3bf01fe6b12e",
            'x-rapidapi-host': "wordsapiv1.p.rapidapi.com"
          }
        })

        const result = await resp.json();
        console.log(result);
        
      } catch (error) { 
        console.log(error);
        
      }
    }
    fn();
  }, [])

  const handleAddWord = async () => {
    if (!newWordInput) {
      Alert.alert("Error", "Please enter a word.");
      return;
    }
    setIsSubmitting(true)
    try {
      
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add word. Please try again later.");
    } finally {
      setNewWordInput('')
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView className="bg-white h-full w-full justify-center items-center">
        <ActivityIndicator size="large" color={"#FF6B6B"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="my-6 px-4 space-y-6">
        <View className="justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-md text-secondary-black">
              Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-primary-black">
              Roshan
            </Text>
          </View>
        </View>

        <SearchInput
          query={query}
          setQuery={setQuery}
        />
      </View>
      <View className="absolute bottom-5 right-5">
        <TouchableOpacity
          className="bg-primary w-[55px] h-[55px] justify-center items-center rounded-full z-10"
          style={{
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={icons.plus}
            resizeMode="contain"
            className="w-10 h-10"
            tintColor="#fff"
          />
        </TouchableOpacity>
      </View>
        
      <Modal
          animationType="slide"
          transparent={true}
          statusBarTranslucent
          visible={modalVisible}          
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
            <View className="flex-1 justify-center items-center bg-[#00000054]">
              <View className="w-[90vw] pt-5 pb-6 px-5 bg-white rounded-lg">
                <View className="flex-row justify-between items-center">
                  <Text className="font-psemibold text-lg">Add new word</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Image 
                      source={icons.close}
                      resizeMode="contain"
                      className="w-6 h-6"
                    />
                  </TouchableOpacity>
                </View>
                <FormField 
                  title="New Word"
                  placeholder="Enter new word..."
                  value={newWordInput}
                  handleChangeText={(e) => setNewWordInput(e)}
                  otherStyles="mt-5 mb-3"
                  titleStyle="text-sm"
                />
                <CustomButton 
                  title="Submit"
                  handlePress={handleAddWord}
                />
              </View>
            </View>
          {/* <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View> */}
        </Modal>


      <FlatList
        // data={[{id: 1}, {id: 2}, {id: 3}]}
        data={filteredData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TouchableOpacity className="w-full px-5 my-1" activeOpacity={0.7}>
            <VocabCard data={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No words found"
            subtitle="Start saving new words now..."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default Home;
