import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';

import AgreementRegistryForm from './AgreementRegistryForm';
import { IAgreementRegistryFormProps } from '../../models/AgreementRegistryModel';

export default class AgreementRegistryWebPart extends BaseClientSideWebPart<IAgreementRegistryFormProps> {

  public render(): void {
    this.renderReactComponent<IAgreementRegistryFormProps>(this.domElement, AgreementRegistryForm,
      {
        description: this.properties.description,
        context: this.context
      }
    );
  }

  private renderReactComponent<T>(
    domElement: HTMLElement,
    Component: React.ComponentClass<T> | React.StatelessComponent<T>,
    props: T
  ): void {
    const element = React.createElement(Component, props);
    ReactDom.render(element, domElement);
  }
}
