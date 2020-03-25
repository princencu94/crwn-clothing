import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'
import './collection-overview.styles.scss';
import CollectionPreview from '../collection-preview/collection-preview.component';
import {selectCollectionsPreview} from '../../redux/shop/shop.selectors';

const CollectionOverview = ({collections}) => (
    <div className="collection-overview">
        {
        collections.map(({id, ...otherCollectionProps}) => (
             <CollectionPreview key={id} {...otherCollectionProps}/>
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsPreview
});

export default connect(mapStateToProps)(CollectionOverview);