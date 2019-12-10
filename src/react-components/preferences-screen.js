import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../assets/stylesheets/preferences-screen.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import { lang, messages } from "../utils/i18n";
import { PreferenceListItem, PREFERENCE_LIST_ITEM_TYPE } from "./preference-list-item";
addLocaleData([...en]);

export default class PreferencesScreen extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    store: PropTypes.object
  };

  UNSAFE_componentWillMount() {
    window.APP.preferenceScreenIsVisible = true;
  }
  componentWillUnmount() {
    window.APP.preferenceScreenIsVisible = false;
  }

  render() {
    const preferenceListItem = props => {
      return (
        <PreferenceListItem
          key={props.key}
          store={this.props.store}
          storeKey={props.key}
          prefType={props.prefType}
          min={props.min}
          max={props.max}
          currentValue={props.currentValue}
          onChange={props.onChange}
          options={props.options}
          defaultNumber={props.defaultNumber}
          defaultString={props.defaultString}
          defaultBool={props.defaultBool}
        />
      );
    };
    // TODO: Add search text field and sort rows by fuzzy search
    const general = [
      { key: "muteMicOnEntry", prefType: PREFERENCE_LIST_ITEM_TYPE.CHECK_BOX, defaultBool: false },
      { key: "onlyShowNametagsInFreeze", prefType: PREFERENCE_LIST_ITEM_TYPE.CHECK_BOX, defaultBool: false },
      { key: "allowMultipleHubsInstances", prefType: PREFERENCE_LIST_ITEM_TYPE.CHECK_BOX, defaultBool: false },
      { key: "maxResolution", prefType: PREFERENCE_LIST_ITEM_TYPE.MAX_RESOLUTION },
      {
        key: "globalVoiceVolume",
        prefType: PREFERENCE_LIST_ITEM_TYPE.NUMBER_WITH_RANGE,
        min: 0,
        max: 200,
        defaultNumber: 100
      },
      {
        key: "globalMediaVolume",
        prefType: PREFERENCE_LIST_ITEM_TYPE.NUMBER_WITH_RANGE,
        min: 0,
        max: 200,
        defaultNumber: 100
      }
    ].map(preferenceListItem);

    return (
      <IntlProvider locale={lang} messages={messages}>
        <div className={classNames(styles.root)}>
          <i className={classNames(styles.floatRight)} onClick={e => this.props.onClose(e)}>
            <FontAwesomeIcon icon={faTimes} />
          </i>
          <div className={classNames(styles.contentContainer)}>
            <div className={classNames(styles.titleBar)}>
              <div className={classNames(styles.title)}>
                <span>Preferences</span>
              </div>
            </div>
            <div className={classNames(styles.scrollingContent)}>{general}</div>
          </div>
        </div>
      </IntlProvider>
    );
  }
}