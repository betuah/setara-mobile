export const FEED = 'FEED'
export const LOAD_FEED = 'LOAD_FEED'

export const initData = () => {
    return async dispatch => {
        const data = {
            feed: [
                {
                    id: '1',
                    foto: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                    post: 'Dududidambabababa bobobobo eaeaeaea oooooooooooooo' ,
                    kelas: 'Kelas X',
                    creator: 'Betuah Anugerah',
                    timeAgo: '3 Tahun Lalu'
                },
                {
                    id: '2',
                    foto: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                    post: 'Dududidambabababa bobobobo eaeaeaea oooooooooooooo' ,
                    kelas: 'Kelas X',
                    creator: 'Betuah Anugerah',
                    timeAgo: '3 Tahun Lalu'
                },
                {
                    id: '3',
                    foto: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                    post: 'Dududidambabababa bobobobo eaeaeaea oooooooooooooo' ,
                    kelas: 'Kelas X',
                    creator: 'Betuah Anugerah',
                    timeAgo: '3 Tahun Lalu'
                },
                {
                    id: '4',
                    foto: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                    post: 'Dududidambabababa bobobobo eaeaeaea oooooooooooooo' ,
                    kelas: 'Kelas X',
                    creator: 'Betuah Anugerah',
                    timeAgo: '3 Tahun Lalu'
                },
                {
                    id: '5',
                    foto: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                    post: 'Dududidambabababa bobobobo eaeaeaea oooooooooooooo' ,
                    kelas: 'Kelas X',
                    creator: 'Betuah Anugerah',
                    timeAgo: '3 Tahun Lalu'
                },
                {
                    id: 6,
                    foto: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                    post: 'Dududidambabababa bobobobo eaeaeaea oooooooooooooo' ,
                    kelas: 'Kelas X',
                    creator: 'Betuah Anugerah',
                    timeAgo: '3 Tahun Lalu'
                },
                {
                    id: 7,
                    foto: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                    post: 'Dududidambabababa bobobobo eaeaeaea oooooooooooooo' ,
                    kelas: 'Kelas X',
                    creator: 'Betuah Anugerah',
                    timeAgo: '3 Tahun Lalu'
                },
                {
                    id: 8,
                    foto: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                    post: 'Dududidambabababa bobobobo eaeaeaea oooooooooooooo' ,
                    kelas: 'Kelas X',
                    creator: 'Betuah Anugerah',
                    timeAgo: '3 Tahun Lalu'
                },
                {
                    id: 9,
                    foto: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                    post: 'Dududidambabababa bobobobo eaeaeaea oooooooooooooo' ,
                    kelas: 'Kelas X',
                    creator: 'Betuah Anugerah',
                    timeAgo: '3 Tahun Lalu'
                },
                {
                    id: 10,
                    foto: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                    post: 'Dududidambabababa bobobobo eaeaeaea oooooooooooooo' ,
                    kelas: 'Kelas X',
                    creator: 'Betuah Anugerah',
                    timeAgo: '3 Tahun Lalu'
                },
            ]
        }

        setTimeout(() => {
            dispatch({
                type: LOAD_FEED,
                feed: data.feed,
            })
        }, 3000);
    }
}