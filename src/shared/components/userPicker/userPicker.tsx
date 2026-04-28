import * as React from 'react';
import { CompactPeoplePicker, IPersonaProps } from 'office-ui-fabric-react';
import './userPicker.scss';
import { IUserPickerProps, IUserPickerState } from '../../../models/FieldModel';
import HoverCard from '../HoverCard/HoverCard';
import { IUserPicker } from '../../../models/UserPicker';

export default class UserPicker extends React.Component<IUserPickerProps, IUserPickerState> {
  constructor(props: IUserPickerProps) {
    super(props);
    this.state = {
      selectedItems: []
    };
  }

  public componentDidUpdate(prevProps: IUserPickerProps): void {
    if (this.props.clearSelection !== prevProps.clearSelection && this.props.clearSelection) {
      this.clearSelection();
    }
    if (
      this.props.value !== prevProps.value ||
      this.props.keyValue !== prevProps.keyValue
    ) {
      if (this.props.value && this.props.keyValue) {

        this.setState({
          selectedItems: [{
            primaryText: this.props.value,
            optionalText: String(this.props.keyValue)
          }]
        });

      }
    }
  }

  private _onChange = (items?: IPersonaProps[]): void => {
    const safeItems = items ? items : [];
    const selected = safeItems.length ? safeItems[0] : null;

    this.setState({ selectedItems: safeItems });

    if (this.props.onUserSelected) {
      const contractOwner: IUserPicker = selected
        ? {
          Id: typeof selected.id === "number" ? selected.id : null,
          Title: selected.primaryText || "",
          LoginName: selected.optionalText || "",
          Email: selected.secondaryText || ""
        }
        : {
          Id: null,
          Title: "",
          LoginName: "",
          Email: ""
        };

      this.props.onUserSelected(contractOwner);
    }
  }

  private clearSelection(): void {
    this.setState({ selectedItems: [] });
  }

  public render(): React.ReactElement<IUserPickerProps> {
    return (
      <div>
        <CompactPeoplePicker
          className="userPicker"
          onResolveSuggestions={this.props.onResolveSuggestions}
          selectedItems={this.state.selectedItems}
          itemLimit={this.props.itemLimit}
          onChange={this._onChange}
          onRenderSuggestionsItem={(item: IPersonaProps) => {
            return (
              <div className="suggestionItemWrapper">
                <HoverCard item={item}>
                  <div className="suggestionItemContent">
                    {item.primaryText}
                  </div>
                </HoverCard>

                {item.secondaryText && (
                  <div>
                    {item.secondaryText}
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>
    );
  }
}