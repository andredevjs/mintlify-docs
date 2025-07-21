import { BaseService } from '../services/base';
import {
  TokenEntity,
  TokensResponse,
  TokenResponse,
  TokensQueryParams,
  CommentsResponse,
  CommentsQueryParams,
  CreateTokenCommentDto,
  CommentResponse,
  OwnersResponse,
  OwnersQueryParams,
  TradesResponse,
  TradesQueryParams,
  TokenFeedResponse,
  TokenFeedQueryParams,
  TradingViewFeedQueryParams,
  FavoriteResponse,
} from '../types/token';
import { OdinError } from '../utils/errors';

export class TokenService extends BaseService {
  /**
   * Get all tokens with optional filtering and pagination
   */
  async getTokens(params?: TokensQueryParams): Promise<TokensResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(v => queryParams.append(key, v.toString()));
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }

      const url = `/tokens${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<TokensResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error('Failed to get tokens:', error);
      throw new OdinError('Failed to get tokens', 'GET_TOKENS_ERROR', undefined, error);
    }
  }

  /**
   * Get a specific token by ID
   */
  async getToken(tokenId: string): Promise<TokenEntity> {
    try {
      const response = await this.makeRequest<TokenEntity>('GET', `/token/${tokenId}`);
      return response;
    } catch (error) {
      this.logger?.error(`Failed to get token ${tokenId}:`, error);
      throw new OdinError(`Failed to get token ${tokenId}`, 'GET_TOKEN_ERROR', undefined, error);
    }
  }

  /**
   * Get comments for a specific token
   */
  async getTokenComments(tokenId: string, params?: CommentsQueryParams): Promise<CommentsResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(v => queryParams.append(key, v.toString()));
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }

      const url = `/token/${tokenId}/comments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<CommentsResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get comments for token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to get comments for token ${tokenId}`,
        'GET_TOKEN_COMMENTS_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get community comments for a specific token
   */
  async getTokenCommunityComments(
    tokenId: string,
    params?: CommentsQueryParams
  ): Promise<CommentsResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(v => queryParams.append(key, v.toString()));
            } else {
              queryParams.append(key, value.toString());
            }
          }
        });
      }

      const url = `/token/${tokenId}/community-comments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<CommentsResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get community comments for token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to get community comments for token ${tokenId}`,
        'GET_TOKEN_COMMUNITY_COMMENTS_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Post a comment on a token (requires authentication)
   */
  async postTokenComment(
    tokenId: string,
    comment: CreateTokenCommentDto
  ): Promise<CommentResponse> {
    try {
      const response = await this.makeRequest<CommentResponse>(
        'POST',
        `/token/${tokenId}/comment`,
        comment
      );
      return response;
    } catch (error) {
      this.logger?.error(`Failed to post comment on token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to post comment on token ${tokenId}`,
        'POST_TOKEN_COMMENT_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get token owners/holders
   */
  async getTokenOwners(tokenId: string, params?: OwnersQueryParams): Promise<OwnersResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `/token/${tokenId}/owners${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<OwnersResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get owners for token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to get owners for token ${tokenId}`,
        'GET_TOKEN_OWNERS_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get token liquidity providers
   */
  async getTokenLiquidity(tokenId: string, params?: OwnersQueryParams): Promise<OwnersResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `/token/${tokenId}/liquidity${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<OwnersResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get liquidity for token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to get liquidity for token ${tokenId}`,
        'GET_TOKEN_LIQUIDITY_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get token trades
   */
  async getTokenTrades(tokenId: string, params?: TradesQueryParams): Promise<TradesResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `/token/${tokenId}/trades${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<TradesResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get trades for token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to get trades for token ${tokenId}`,
        'GET_TOKEN_TRADES_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get token price feed data
   */
  async getTokenFeed(tokenId: string, params?: TokenFeedQueryParams): Promise<TokenFeedResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `/token/${tokenId}/feed${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<TokenFeedResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get feed for token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to get feed for token ${tokenId}`,
        'GET_TOKEN_FEED_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get TradingView compatible feed data
   */
  async getTokenTradingViewFeed(
    tokenId: string,
    params?: TradingViewFeedQueryParams
  ): Promise<TokenFeedResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = `/token/${tokenId}/tv_feed${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await this.makeRequest<TokenFeedResponse>('GET', url);

      return response;
    } catch (error) {
      this.logger?.error(`Failed to get TradingView feed for token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to get TradingView feed for token ${tokenId}`,
        'GET_TOKEN_TV_FEED_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Get token image
   */
  async getTokenImage(tokenId: string): Promise<Blob> {
    try {
      // For binary data, we need to handle it differently
      const response = await fetch(`${this.config.baseUrl}/token/${tokenId}/image`, {
        method: 'GET',
        headers: {
          ...this.getHeaders(),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      this.logger?.error(`Failed to get image for token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to get image for token ${tokenId}`,
        'GET_TOKEN_IMAGE_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Add token to favorites (requires authentication)
   */
  async addToFavorites(tokenId: string): Promise<FavoriteResponse> {
    try {
      const response = await this.makeRequest<FavoriteResponse>(
        'POST',
        `/token/${tokenId}/favorite`
      );
      return response;
    } catch (error) {
      this.logger?.error(`Failed to add token ${tokenId} to favorites:`, error);
      throw new OdinError(
        `Failed to add token ${tokenId} to favorites`,
        'ADD_TOKEN_FAVORITE_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Remove token from favorites (requires authentication)
   */
  async removeFromFavorites(tokenId: string): Promise<FavoriteResponse> {
    try {
      const response = await this.makeRequest<FavoriteResponse>(
        'DELETE',
        `/token/${tokenId}/favorite`
      );
      return response;
    } catch (error) {
      this.logger?.error(`Failed to remove token ${tokenId} from favorites:`, error);
      throw new OdinError(
        `Failed to remove token ${tokenId} from favorites`,
        'REMOVE_TOKEN_FAVORITE_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Pin a comment on a token (requires authentication and ownership)
   */
  async pinComment(tokenId: string, commentId: number): Promise<CommentResponse> {
    try {
      const response = await this.makeRequest<CommentResponse>(
        'POST',
        `/token/${tokenId}/comment/${commentId}/pin`
      );
      return response;
    } catch (error) {
      this.logger?.error(`Failed to pin comment ${commentId} on token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to pin comment ${commentId} on token ${tokenId}`,
        'PIN_TOKEN_COMMENT_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Unpin a comment on a token (requires authentication and ownership)
   */
  async unpinComment(tokenId: string, commentId: number): Promise<CommentResponse> {
    try {
      const response = await this.makeRequest<CommentResponse>(
        'POST',
        `/token/${tokenId}/comment/${commentId}/unpin`
      );
      return response;
    } catch (error) {
      this.logger?.error(`Failed to unpin comment ${commentId} on token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to unpin comment ${commentId} on token ${tokenId}`,
        'UNPIN_TOKEN_COMMENT_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Upvote or downvote a comment (requires authentication)
   */
  async voteComment(
    tokenId: string,
    commentId: number,
    action: 'upvote' | 'downvote'
  ): Promise<any> {
    try {
      const response = await this.makeRequest(
        'POST',
        `/token/${tokenId}/comment/${commentId}/${action}`
      );
      return response;
    } catch (error) {
      this.logger?.error(`Failed to ${action} comment ${commentId} on token ${tokenId}:`, error);
      throw new OdinError(
        `Failed to ${action} comment ${commentId} on token ${tokenId}`,
        'VOTE_TOKEN_COMMENT_ERROR',
        undefined,
        error
      );
    }
  }

  /**
   * Remove upvote from a comment (requires authentication)
   */
  async removeUpvote(commentId: number): Promise<any> {
    try {
      const response = await this.makeRequest('DELETE', `/token/*/comment/${commentId}/upvote`);
      return response;
    } catch (error) {
      this.logger?.error(`Failed to remove upvote from comment ${commentId}:`, error);
      throw new OdinError(
        `Failed to remove upvote from comment ${commentId}`,
        'REMOVE_COMMENT_UPVOTE_ERROR',
        undefined,
        error
      );
    }
  }
}
