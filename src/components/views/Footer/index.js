import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {Grid, Header, Icon} from 'semantic-ui-react'
import {StyledFooter, StyledFooterInner} from './style'

export default class Footer extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <StyledFooter>
        <StyledFooterInner>
          <Grid relaxed>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width={12} mobile={16}>
                <a>
                  <Header as="h3" inverted>
                    <Icon name="github" />
                    <Header.Content>
                      Footer
                    </Header.Content>
                  </Header>
                </a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </StyledFooterInner>
      </StyledFooter>
    )
  }
}
