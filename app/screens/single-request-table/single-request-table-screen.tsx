import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, StyleSheet, SafeAreaView } from "react-native"
import { Screen, GradientBackground } from "../../components"
import {
  NativeBaseProvider,
  ScrollView,
  View,
} from 'native-base'
import { Provider as PaperProvider, DataTable } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { useStores } from "../../models"
import { Table, TableWrapper, Row } from 'react-native-table-component'
import { color, typography } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const optionsPerPage = [2, 3, 4]

export const SingleRequestTableScreen = observer(function SingleRequestTableScreen({route}: any) {
  const [refreshing, setRefreshing] = React.useState(false)
  const [singleRequestInfo, setSingleRequestInfo] = React.useState<any>()
  const { projectContentStore } = useStores()
  const { projectContent } = projectContentStore
  const [page, setPage] = React.useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0])
  const [tableHead, setTableHead] = React.useState(['Codice', 'Descrizione', 'Parti', 'Lung.', 'Larg.', 'H/Peso', 'Um', 'Quantita', 'Budget U.', 'Budget'])
  const [widthArr, setWidthArr] = React.useState([150, 300, 80, 80, 80, 80, 50, 80, 90, 100])
  const [tableData, setTableData] = React.useState<any>([])

  useFocusEffect(
    React.useCallback(() => {
      getContent().then(async () => {
        let arrangedBomItems = await projectContentStore.bomItemSet.map(item => {
          return [
            item.node.code || '-',
            item.node.description || '-',
            item.node.parts || '-',
            item.node.length || '-',
            item.node.width || '-',
            item.node.heightOrWeight || '-',
            item.node.unitOfMeasurement || '-',
            item.node.quantity || '-',
            item.node.unitPrice || '-',
          ]
        })
        setTableData(arrangedBomItems)
      })
    }, [])
  )
  useFocusEffect(
    React.useCallback(() => {
      setPage(0);
    }, [itemsPerPage])
  )

  const getContent = async () => {
    await setRefreshing(true)
    await projectContentStore.getProjectContent({ projectId: route.params.projectId })
    .then(async () => {
      let parsedInfo = await JSON.parse(JSON.stringify(projectContent[0].projectInfo))
      await setSingleRequestInfo(parsedInfo)
    })
    await setRefreshing(false)
  }

  const [expanded, setExpanded] = React.useState(true)

  return (
    <Screen style={ROOT} preset="fixed" unsafe={true}>
      <GradientBackground colors={["#fff", "#fff" ]} />
      <NativeBaseProvider>
        <PaperProvider>
          <View style={styles.container}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{borderWidth: 0.2, borderColor: color.palette.white}}>
                  <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.headerText}/>
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table borderStyle={{borderWidth: 0.2, borderColor: color.palette.lightGrey}}>
                    {
                      tableData.map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={widthArr}
                          style={[styles.row]}
                          textStyle={styles.rowText}
                        />
                      ))
                    }
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </PaperProvider>
      </NativeBaseProvider>
    </Screen>
  )
})


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', display: 'flex', flexDirection: 'row'},
  header: { height: 50, backgroundColor: color.primary },
  headerText: { textAlign: 'center', fontWeight: '300', color: color.palette.white },
  rowText: { textAlign: 'center', fontWeight: '300', color: color.palette.black },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: color.palette.lighterGrey }
})
