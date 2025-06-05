import { ActivityIndicator, View } from "react-native-web"
import { styles } from '../assets/styles/home.styles'
import { COLORS } from '../constants/color'

const PageLoader = () => {
  return (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={COLORS.primary}/>
    </View>
  )
}

export default PageLoader