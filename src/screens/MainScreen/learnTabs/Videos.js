import React, { useState, useEffect, useContext, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Play, Clock, CheckCircle2 } from 'lucide-react-native';
import getVideoTabStyles from "../../../styles/MainScreen/learnTabs/VideosStyle"; 
import { ThemeContext } from "../../../components/ThemeContext"; 
import ModalVideoPlayer from '../../../Modals/ModalVideoPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { GetvideoApi } from '../../../Redux/Api/GetVideoApi';

const Videos = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useContext(ThemeContext);
  const resourceStyle = useMemo(() => getVideoTabStyles(colors), [colors]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { LoginData } = useSelector(state => state.Login);
  const { GetVideoData } = useSelector(state => state.GetVideo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetvideoApi(LoginData.token));
  }, []);
  
  const videos = GetVideoData?.utube_vedios || [];
  
  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  
  const getThumbnail = (url) => {
    const VideoID = getYoutubeId(url);
    return VideoID
      ? `https://img.youtube.com/vi/${VideoID}/hqdefault.jpg`
      : null ; 
  };

  return (
    <View style={resourceStyle.tabContainer}>
       <FlatList
        data={videos}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={[resourceStyle.listContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={resourceStyle.itemCard}  
            activeOpacity={0.7}
            onPress={() => setSelectedVideo(item.url)}
          >
            <View style={resourceStyle.thumbnailBox}>
              <Image 
                source={{uri: getThumbnail(item.url)}}
                style = {resourceStyle.thumbnailImage}
                resizeMode='cover'
              />
              <View style={resourceStyle.playIconOverlay}>
                <Play size={24} color={colors.theme} />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={resourceStyle.titleText} numberOfLines={2}>
                {item.title}
              </Text>
              
              <View style={resourceStyle.row}>
                <View style={resourceStyle.metaRow}>
                  <Clock size={12} color={colors.textSecondary} />
                  <Text style={resourceStyle.subText}>{item.duration || "0:00"}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <ModalVideoPlayer
        visible={!!selectedVideo}
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </View>
  )
}

export default Videos;