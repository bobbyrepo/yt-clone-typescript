import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Card from '../components/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import { HomeVideoType } from '../utils/Types';
import { useSearchList } from '../Hooks/useSearchList';

function Search({ setSearch }: { setSearch: (query: string) => void }) {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('query');
    const { searchList, fetchSearch, setSearchList } = useSearchList();

    // useEffect(() => {
    //     console.log("SearchList", searchList)
    // }, [searchList])

    useEffect(() => {
        if (searchQuery) {
            setSearchList({ videos: [], nextPageToken: null });
            fetchSearch(searchQuery);
        }
        // Cleanup function to reset searchList on unmount
        return () => {
            setSearchList({ videos: [], nextPageToken: null });
            setSearch("")
        };
    }, [searchQuery]);

    return (
        <div>
            {searchList.videos.length ? (
                <InfiniteScroll
                    dataLength={searchList.videos.length}
                    next={() => fetchSearch(searchQuery!)}
                    hasMore={searchList.videos.length < 500}
                    loader={<Spinner />}
                    height={680}
                >
                    <div className="row row-cols-3 w-[95%] mx-auto mt-6">
                        {searchList.videos.map((item: HomeVideoType) => (
                            <Card data={item} key={item.videoId} />
                        ))}
                    </div>
                </InfiniteScroll>
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default Search