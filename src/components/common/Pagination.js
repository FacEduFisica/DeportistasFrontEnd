import React from 'react'
import PropTypes from 'prop-types';
import {Dropdown} from 'semantic-ui-react';

const Pagination = props => {
    const [currentTop, setCurrentTop] = useState(1);
    const {
      totalItems,
      pages,
      currentPage,
      onRangeChange,
      onPreviousPage,
      onNextPage,
      itemsPerPage
    } = props;
    useEffect(() => {
      setCurrentTop(itemsPerPage);
    });
    const paginateOptions = [
      {
        key: 0,
        text: `Filas por página...`,
        value: 0
      },
      {
        key: 10,
        text: `Filas por página: 10`,
        value: 10
      },
      {
        key: 25,
        text: `Filas por página: 25`,
        value: 25
      },
      {
        key: 50,
        text: `Filas por página: 50`,
        value: 50
      },
      {
        key: 100,
        text: `Filas por página: 100`,
        value: 100
      }
    ];
  
    if (totalItems > 10 && totalItems <= 25) {
      paginateOptions.splice(3);
    } else if (totalItems > 10 && totalItems <= 50) {
      paginateOptions.splice(4);
    }
  
    // const handlePreventDefault = e => {
    //   e.preventDefault();
    //   e.stopPropagation();
    // };
    if (totalItems > 10) {
      return (
        <div className="ui segment">
          <div className="ui one column grid">
            <div className="column">
              <div
                aria-label="Pagination Navigation"
                role="navigation"
                className="ui pagination right floated menu"
                id="pagination-files"
              >
                <a
                  className="item"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }}
                  //eslint-disable-next-line
                  // href="#"
                >
                  <Dropdown
                    onChange={(e, { value: perPage }) => onRangeChange(perPage)}
                    value={paginateOptions[0].value}
                    placeholder="Seleccione"
                    scrolling
                    options={paginateOptions}
                  />
                </a>
                <a
                  className="item"
                  // href="javascript: false"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                  }}
                >
                  <span>
                    {`${currentTop * (currentPage - 1) + 1} - ${
                      currentTop * currentPage > totalItems
                        ? totalItems
                        : currentTop * currentPage
                    } de ${totalItems}`}
                  </span>
                </a>
                <a
                  href="#"
                  aria-current="false"
                  aria-disabled="true"
                  tabIndex="-1"
                  value="previous"
                  aria-label="Previous item"
                  type="prevItem"
                  className={currentPage <= 1 ? 'item disabled' : 'item'}
                  onClick={e =>
                    currentPage <= 1
                      ? e.preventDefault()
                      : onPreviousPage(currentPage - 1)
                  }
                >
                  ⟨
                </a>
  
                <a
                  aria-current="false"
                  aria-disabled="true"
                  tabIndex="-1"
                  value="next"
                  aria-label="Next item"
                  type="nextItem"
                  href="#"
                  className={currentPage < pages ? 'item' : 'item disabled'}
                  onClick={e =>
                    currentPage < pages
                      ? onNextPage(currentPage + 1)
                      : e.preventDefault()
                  }
                >
                  ⟩
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };
  
  Pagination.propTypes = {
    startRange: PropTypes.number.isRequired,
    endRange: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onRangeChange: PropTypes.func.isRequired,
    onPreviousPage: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired
  };
  
  Pagination.defaultProps = {
    startRange: 1,
    endRange: 10,
    totalItems: 10,
    pages: 1,
    currentPage: 1
  };
  
  export default Pagination;