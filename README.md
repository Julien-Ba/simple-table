# React Simple Table Component

A simple table React component with built-in sorting, searching, and pagination capabilities.

## Features

-   🔍 Search functionality across all columns
-   ↕️ Sortable columns
-   📑 Pagination with customizable items per page
-   🎨 Customizable styling through CSS classes
-   📱 Responsive design

## Dependencies

The component has three types of dependencies:

### Required Dependencies

These will be installed automatically when you install the package:

```json
{
    "str-case-converter": "^1.0.4"
}
```

`str-case-converter` is my own utility package that handles string case conversions between different formats. In this component, it enables flexible name prop formatting by automatically converting the provided name to the appropriate case for CSS classes and display purposes.

### Peer Dependencies

These are required to be installed in your project:

```json
{
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0",
    "prop-types": ">=15.7.0"
}
```

### Development Dependencies

These are only needed if you're contributing to the component's development:

```json
{
    "sass": "^1.80.0"
}
```

## Installation

```bash
npm install react-simple-table-component
```

## Basic Usage

```jsx
import Table from 'react-simple-table-component';

const MyComponent = () => {
    const data = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 30 },
        // ... more data
    ];

    return <Table name='users' data={data} itemsPerPage={20} />;
};
```

## Props

### Table Component

| Prop           | Type   | Required | Default | Description                                              |
| -------------- | ------ | -------- | ------- | -------------------------------------------------------- |
| `name`         | string | No       | -       | Unique identifier for the table, used in CSS class names |
| `data`         | array  | No       | -       | Array of objects containing the data to be displayed     |
| `itemsPerPage` | number | No       | 10      | Number of items to show per page                         |

### Data Structure

The `data` prop should be an array of objects where each object represents a row in the table. The object keys will be used as column headers.

```javascript
const data = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        // ... other fields
    },
    // ... more rows
];
```

## Features in Detail

### Sorting

-   Click on any column header to sort by that column
-   Click again to toggle between ascending and descending order
-   Visual indicator shows current sort direction

### Search

-   Search box filters across all columns
-   Case-insensitive search
-   Updates in real-time as user types

### Pagination

-   Navigate through large datasets with Previous/Next buttons
-   Shows current page information
-   Displays total number of results
-   Default of 10 items per page

## CSS Classes

The component uses BEM methodology for CSS classes. Here are the main classes available for styling:

```scss
.table {
    &__search {
        &-input {
        }
        &-icon {
        }
    }
    &__table {
        &__header-cell {
            &-content {
            }
            &-icon {
            }
        }
    }
    &__pagination {
        &-info {
        }
        &-controls {
        }
        &-button {
        }
    }
    &__empty {
        &-message {
        }
    }
}
```

## Customization

You can customize the appearance by overriding the default CSS classes. The table container will have a class name based on the `name` prop: `${name}__table`.

Example:

```scss
.users__table {
    .table__search-input {
        border-radius: 4px;
        // ... other custom styles
    }
}
```
