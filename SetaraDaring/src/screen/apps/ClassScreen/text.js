<View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}>
                            <View style={{
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                borderRadius: 10,
                                marginHorizontal: 10,
                                backgroundColor: '#E8EAF6'
                            }}>
                                <Text
                                    fontWeight={{...fonts.medium}} 
                                    color='#5C6BC0'
                                    size={15}
                                >
                                    {`${soalData.jawaban.filter(itm => itm.id_opsi !== '').length} / ${soalData.soalItem.soal.length}`}
                                </Text>
                            </View>
                            <TouchableRipple 
                                borderless 
                                rippleColor="rgba(0, 0, 0, .32)" 
                                onPress={() => alert('Are you sure ?')}
                            >
                                <Icon name='log-out-outline' color={colors.textWhite} size={25} />
                            </TouchableRipple>
                        </View>

                        <FAB.Group
            open={fabOpen}
            style={{
                position: 'absolute',
                margin: 0,
                right: 0,
                bottom: deviceWidth.height * 0.2,
                left: 0,
                top: 0,
                zIndex: 1,
            }}
            color={colors.textWhite}
            fabStyle={{backgroundColor: colors.primary}}
            icon={fabOpen ? "close" : "send"}
            actions={[
                {
                    color: colors.bgWhite,
                    icon: 'content-save',
                    label: 'Kumpulkan',
                    style: {
                        backgroundColor: colors.deepGreen
                    },
                    onPress: () => saveJabwan(),
                },
            ]}
            onStateChange={() => setFabOpen(!fabOpen)}
        />