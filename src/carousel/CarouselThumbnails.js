import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';
import React from 'react'
import clsx from 'clsx'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import mod from '../utils/mod'
import Image from '../Image'

const PREFIX = 'RSFCarouselThumbnails';

const classes = {
  thumbs: `${PREFIX}-thumbs`,
  thumb: `${PREFIX}-thumb`,
  tabsIndicator: `${PREFIX}-tabsIndicator`,
  tabsRoot: `${PREFIX}-tabsRoot`,
  tabsVertical: `${PREFIX}-tabsVertical`,
  tabsRootLeft: `${PREFIX}-tabsRootLeft`,
  tabsRootRight: `${PREFIX}-tabsRootRight`,
  tabsRootTop: `${PREFIX}-tabsRootTop`,
  tabsRootBottom: `${PREFIX}-tabsRootBottom`,
  tabRoot: `${PREFIX}-tabRoot`,
  selectedTab: `${PREFIX}-selectedTab`,
  tabWrapper: `${PREFIX}-tabWrapper`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  /**
   * Styles applied to the root element.
   */
  [`& .${classes.thumbs}`]: {
    display: 'flex',
    justifyContent: 'center',
  },

  /**
   * Styles applied to each thumbnail element.
   */
  [`& .${classes.thumb}`]: {
    width: 50,
    height: 50,
    boxSizing: 'content-box',
  },

  /**
   * Styles passed through to the [`Tabs`](https://mui.com/api/tabs/#css) element's
   * `indicator` CSS rule.
   */
  [`& .${classes.tabsIndicator}`]: {
    display: 'none',
    backgroundColor: theme.palette.primary.main,
    height: '3px',
    transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },

  /**
   * Styles applied to the root element of the Tabs element
   */
  [`& .${classes.tabsRoot}`]: {},

  /**
   * Styles applied the to the root element of the Tabs element when `thumbnailPosition` is `left` or `right`.
   */
  [`& .${classes.tabsVertical}`]: {
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
    },
  },

  /**
   * Styles applied to the root element of the Tabs element when `thumbnailPosition` is `left`.
   */
  [`& .${classes.tabsRootLeft}`]: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2),
    },
  },

  /**
   * Styles applied to the root element of the Tabs element when `thumbnailPosition` is `right`.
   */
  [`& .${classes.tabsRootRight}`]: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },

  /**
   * Styles applied to the root element of the Tabs element when `thumbnailPosition` is `top`.
   */
  [`& .${classes.tabsRootTop}`]: {
    marginBottom: theme.spacing(2),
  },

  /**
   * Styles applied to the root element of the Tabs element when `thumbnailPosition` is `bottom`.
   */
  [`& .${classes.tabsRootBottom}`]: {
    marginTop: theme.spacing(2),
  },

  /**
   * Styles passed through to each [`Tab`](https://mui.com/api/tabs/#css) element's
   * `root` CSS rule.
   */
  [`& .${classes.tabRoot}`]: {
    minWidth: 'auto',
    padding: 0,
    outline: 'none',
    opacity: 0.7,
    transition: 'opacity linear 100ms',
    '&:hover': {
      opacity: 0.9,
    },
  },

  /**
   * Styles passed through to each [`Tab`](https://mui.com/api/tabs/#css) element's
   * `selected` CSS rule.
   */
  [`& .${classes.selectedTab}`]: {
    opacity: 1,
  },

  /**
   * Styles passed through to each [`Tab`](https://mui.com/api/tabs/#css) element's
   * `wrapper` CSS rule.
   */
  [`& .${classes.tabWrapper}`]: {
    margin: '0 2px',
    border: '1px solid transparent',
    '$selectedTab &': {
      border: `1px solid rgba(0,0,0,0.3)`,
    },
  }
}));

export {};

/**
 * A set of thumbnails to show below a [`Carousel`](/apiReference/carousel/Carousel). Thumbnails can
 * be clicked to switch to the given slide. Internally, `CarouselThumbnails` uses MaterialUI's
 * [`Tabs`](https://mui.com/api/tabs) component to indicate which slide is selected
 */
function CarouselThumbnails({
  thumbnails,
  selected,
  setSelected,
  classes,
  className,
  thumbnailPosition,
  ImageComponent,
}) {

  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isVertical = !isSmall && ['left', 'right'].includes(thumbnailPosition)
  const count = thumbnails.length

  return (
    <Root className={clsx(className, styles.thumbs)}>
      <Tabs
        indicatorColor="primary"
        textColor="inherit"
        value={selected !== false ? mod(selected, count) : false}
        variant="scrollable"
        onChange={(_, index) => setSelected(index)}
        orientation={isVertical ? 'vertical' : 'horizontal'}
        classes={{
          root: clsx(styles.tabsRoot, {
            [styles.tabsVertical]: isVertical,
            [styles.tabsRootLeft]: thumbnailPosition === 'left',
            [styles.tabsRootRight]: thumbnailPosition === 'right',
            [styles.tabsRootTop]: thumbnailPosition === 'top',
            [styles.tabsRootBottom]: thumbnailPosition === 'bottom',
          }),
          indicator: styles.tabsIndicator,
        }}
      >
        {thumbnails.map(({ src, alt }, i) => {
          const icon = <ImageComponent contain className={styles.thumb} src={src} alt={alt} />
          return (
            <Tab
              classes={{
                root: styles.tabRoot,
                wrapper: styles.tabWrapper,
                selected: styles.selectedTab,
              }}
              key={i}
              icon={icon}
            />
          )
        })}
      </Tabs>
    </Root>
  );
}

CarouselThumbnails.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * CSS class to apply to the root element.
   */
  className: PropTypes.string,

  /**
   * Index of the currently selected slide in the [`Carousel`](/apiReference/carousel/Carousel).
   */
  selected: PropTypes.number,

  /**
   * Function to change the value of [`selected`](#prop-selected).
   */
  setSelected: PropTypes.func,

  /**
   * Array of objects containing the data for an image to be used for each thumbnail.
   */
  thumbnails: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  ),

  /**
   * Position of the thumbnails, relative to the main carousel image.
   */
  thumbnailPosition: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),

  /**
   * The component type to use to display images.
   */
  ImageComponent: PropTypes.elementType,
}

CarouselThumbnails.defaultProps = {
  ImageComponent: Image,
}

export default CarouselThumbnails
