import React, { Component } from 'react'
import { IScreenProps } from '~/screens/shared/interface'
import { IDataScanner } from '../ScannerScreen'


export abstract class BaseScreen<IPpros extends IScreenProps = any> extends Component<IPpros>  {

}


export interface IListenerScanner {
    onBarCodeRead: (dataScanner?: IDataScanner) => void
}
