import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  containerCreate: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerCreate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitleCreate: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  backButtonCreate: {
    padding: 5,
  },
  saveButtonContainerCreate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  saveButtonDisabledCreate: {
    opacity: 0.5,
  },
  saveButtonCreate: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "600",
  },
  cardCreate: {
    backgroundColor: COLORS.card,
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typeSelectorCreate: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  typeButtonCreate: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  typeButtonActiveCreate: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeIconCreate: {
    marginRight: 8,
  },
  typeButtonTextCreate: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "500",
  },
  typeButtonTextActiveCreate: {
    color: COLORS.white,
  },
  amountContainerCreate: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 16,
    marginBottom: 20,
  },
  currencySymbolCreate: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginRight: 8,
  },
  amountInputCreate: {
    flex: 1,
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.text,
  },
  inputContainerCreate: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    backgroundColor: COLORS.white,
  },
  inputIconCreate: {
    marginHorizontal: 12,
  },
  inputCreate: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  sectionTitleCreate: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 15,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryGridCreate: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButtonCreate: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  categoryButtonActiveCreate: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryIconCreate: {
    marginRight: 6,
  },
  categoryButtonTextCreate: {
    color: COLORS.text,
    fontSize: 14,
  },
  categoryButtonTextActiveCreate: {
    color: COLORS.white,
  },
  loadingContainerCreate: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
