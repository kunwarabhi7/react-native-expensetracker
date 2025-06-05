
import { View } from 'react-native-web'
import { styles } from '../assets/styles/home.styles'
import { Image, Text, TouchableOpacity } from 'react-native'
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import {Ionicons} from '@expo/vector-icons'
import { SignOutButton } from './SignOutButton';
const MainHeader = () => {
      const { user } = useUser();
      const router = useRouter();
  return (
    <View style={styles.header}>
{/* Left */}
<View style={styles.headerLeft}>
<Image 
source={require("../assets/images/logo.png")}
      
style={styles.headerLogo} resizeMode='contain'/>

<View style={styles.welcomeContainer}>
    <Text style={styles.welcomeText}>Welcome,</Text>
<Text style={styles.usernameText}>{user?.emailAddresses[0]?.emailAddress.split("@")[0]}</Text>

</View>

</View>

{/* Right */}
<View style={styles.headerRight}>
<TouchableOpacity style={styles.addButton} onPress={()=>router.push("/create")}>
<Ionicons name='add-circle-outline' size={20} color="#FFF"/>
<Text style={styles.addButtonText}>Add</Text>
</TouchableOpacity>
<SignOutButton />
</View>

    </View>
  )
}

export default MainHeader